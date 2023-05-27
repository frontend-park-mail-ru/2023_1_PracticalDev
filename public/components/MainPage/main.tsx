import { Component, createElement } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { IPin } from '../../models';
import { Main } from '../Main/main';
import { store } from '../../store/store';
import { Pin } from '../../models/pin';
import { throttle } from '../../util/throttle';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { loadNewPins, loadPins, safeFeedPos, updateLikeState } from '../../actions/feed';
type MainScreenProps = {};
type MainScreenState = {
    pins: IPin[];
    pageNumber: number; // TODO(@UjinIaly): убрать в переменную https://ru.react.js.org/docs/state-and-lifecycle.html
};

export class MainScreen extends Component<MainScreenProps, MainScreenState> {
    private unsubs: Function[] = [];

    constructor() {
        super();
        const feedPos = store.getState().feedPos;
        if (feedPos) {
            this.state = {
                pins: store.getState().pins,
                pageNumber: Math.ceil(store.getState().pins.length / 30),
            };
            return;
        }

        this.state = {
            pageNumber: 1,
            pins: [],
        };
    }

    private LoadPinsCallback = () => {
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
    };

    private LoadNewPins = () => {
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
    };

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    private checkPosition = () => {
        const height = document.body.scrollHeight;
        const screenHeight = window.innerHeight;
        const scrolled = window.scrollY;

        const threshold = height - screenHeight / 6;

        const position = scrolled + screenHeight;
        if (position >= threshold) {
            this.state.pageNumber++; // TODO(@UjinIaly): убрать в переменную https://ru.react.js.org/docs/state-and-lifecycle.html
            this.fetchPosts();
        }
    };

    private LoadUserCallback = () => {
        if (store.getState().type !== 'loadedUser') return;
        const a = [Pin.getFeed()];

        for (let i = 1; i < this.state.pageNumber; ++i) {
            a.push(Pin.getNewPins(i));
        }

        Promise.all(a).then((pages) => {
            let pins: IPin[] = [];
            pages.forEach((page) => {
                pins = [...pins, ...page];
            });

            updateLikeState(pins);
        });
    };

    private fetchPosts = () => {
        Pin.getNewPins(this.state.pageNumber).then((pins) => {
            loadNewPins(pins);
        });
    };

    componentDidMount(): void {
        window.addEventListener('scroll', throttle(this.checkPosition, 250));
        window.addEventListener('resize', throttle(this.checkPosition, 250));

        this.unsubs.push(store.subscribe(this.LoadNewPins));
        this.unsubs.push(store.subscribe(this.LoadPinsCallback));
        this.unsubs.push(store.subscribe(this.LoadUserCallback));
        const scrollHeight = store.getState().feedPos;
        setTimeout(() => {
            if (store.getState().page !== '/feed') return;
            document.body.scrollTo(0, scrollHeight);
        }, 0);

        safeFeedPos(0);
        if (!this.state.pins) return;
        Pin.getFeed().then((pins) => {
            loadPins(pins);
        });
    }

    render() {
        return (
            <Main>
                <Feed pins={this.state.pins} key="feed" />
                <footer
                    className="pin_container__footer"
                    style="font-family:Inter; margin-bottom:30px; margin-top:20px; color:var(--color-dark);"
                >
                    PickPin, 2023
                </footer>
            </Main>
        );
    }
}
