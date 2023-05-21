import { Component, createElement } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { IPin } from '../../models';
import { Main } from '../Main/main';
import { store } from '../../store/store';
import { Pin } from '../../models/pin';
import { safeFeedPos } from '../../actions/feed';
type MainScreenProps = {};
type MainScreenState = {
    pins: IPin[];
    pageNumber: number; // TODO(@UjinIaly): убрать в переменную https://ru.react.js.org/docs/state-and-lifecycle.html
};

export class MainScreen extends Component<MainScreenProps, MainScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        this.state = {
            pageNumber:1,
            pins: [],
        };
    }

    private LoadPinsCallback() {
        if (store.getState().type !== 'loadedPins') {
            return;
        }

        const pins = store.getState().pins;

        if (pins === this.state.pins) {
            return;
        }

        this.setState((s: MainScreenState) => {
            return {
                ...s,
                pins: pins,
            };
        });
    }

    private LoadNewPins() {
        if (store.getState().type !== 'loadedNewPins') {
            return;
        }

        const pins = store.getState().pins;

        if (pins === this.state.pins) {
            return;
        }
        this.setState((s: MainScreenState) => {
            return {
                ...s,
                pins: pins,
            };
        });
    }

    componentDidMount(): void {
        window.addEventListener('scroll', this.throttle(this.checkPosition, 250));
        window.addEventListener('resize', this.throttle(this.checkPosition, 250));

        this.unsubs.push(store.subscribe(this.LoadNewPins.bind(this)));

        this.unsubs.push(store.subscribe(this.LoadPinsCallback.bind(this)));
        Pin.getFeed().then((res) => {
            store.dispatch({
                type: 'loadedPins',
                payload: {
                    pins: res as IPin[],
                },
            });
        });
    }
    
    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    componentDidUpdate(): void {
    }

    private throttle = (callee:any, timeout:number) => {
        let timer: any
      
        return function perform(...args :any[]) {
          if (timer) return
      
          timer = setTimeout(() => {
            callee(...args)
      
            clearTimeout(timer)
            timer = undefined
          }, timeout)
        }
      }

    private checkPosition = () => {
        const height = document.body.scrollHeight
        const screenHeight = window.innerHeight
        const scrolled = window.scrollY
      
        const threshold = height - screenHeight / 6
      
        const position = scrolled + screenHeight
        if (position >= threshold) {
            this.state.pageNumber++; // TODO(@UjinIaly): убрать в переменную https://ru.react.js.org/docs/state-and-lifecycle.html
            this.fetchPosts();
        }
    }
    private fetchPosts = () =>{
        Pin.getNewPins(this.state.pageNumber).then((res) => {
            store.dispatch({
                type: 'loadedNewPins',
                payload: {
                   pins: res as IPin[],
                },
            });
        });
    }
    render() {
        return (
            <Main>
                <Feed pins={this.state.pins} key="feed" />
            </Main>
        );
    }
}
