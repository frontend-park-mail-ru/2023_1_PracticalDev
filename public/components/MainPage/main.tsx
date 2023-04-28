import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IPin, IUser } from '../../models';

import { store } from '../../store/store';
import { Pin } from '../../models/pin';
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

    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header key="header" />
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <Feed pins={this.state.pins} key="feed" />
                    </div>
                </div>
            </div>
        );
    }
}
