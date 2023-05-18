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
};

export class MainScreen extends Component<MainScreenProps, MainScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        this.state = {
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

    componentDidMount(): void {
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
        setTimeout(() => {
            window.scrollTo(0, store.getState().feedPos);
            safeFeedPos(0);
        }, 0);
    }

    render() {
        return (
            <Main>
                <Feed pins={this.state.pins} key="feed" />
            </Main>
        );
    }
}
