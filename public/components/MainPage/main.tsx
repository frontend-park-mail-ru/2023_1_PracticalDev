import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IPin } from '../../models';
import { store } from '../../store/store';
import Ajax from '../../util/ajax';

type MainScreenProps = {};
type MainScreenState = {
    selectedTab: 'feed' | 'profile' | 'settings';
    pins: IPin[];
};

const LoadPins = () => {
    Ajax.get('/api/pins').then((response) => {
        if (!response.ok) {
            if (response.status === 401) {
                store.dispatch({
                    type: 'navigate',
                    payload: {
                        page: '/login',
                    },
                });
            }
        }
        store.dispatch({
            type: 'loadedPins',
            payload: {
                pins: response.body.pins as IPin[],
            },
        });
    });
};

export class MainScreen extends Component<MainScreenProps, MainScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        this.state = {
            selectedTab: 'feed',
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
        LoadPins();
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
                <Header
                    key="header"
                    username="username"
                    avatarSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                />
                <div key="app" id="app" style="left: 100px; width: calc(100% - 100px); top: 80px;">
                    <div key="main__content" className="main__content">
                        <Feed pins={this.state.pins} key="feed" />
                    </div>
                </div>
            </div>
        );
    }
}
