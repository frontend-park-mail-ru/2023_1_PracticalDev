import { Component, createElement } from '@t1d333/pickpinlib';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IPin } from '../../models';
import Feed from '../Feed/feed';
import { store } from '../../store/store';
import Ajax from '../../util/ajax';

type BoardScreenProps = {
    name: string;
};
type BoardScreenState = {
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
            type: 'loaded_pins',
            payload: {
                pins: response.body as IPin[],
            },
        });
    });
};

export class BoardScreen extends Component<BoardScreenProps, BoardScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        this.state = {
            pins: [],
        };
    }

    private LoadPinsCallback() {
        const pins = store.getState().pins;
        if (pins === this.state.pins) {
            return;
        }
        this.setState((s: BoardScreenState) => {
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
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <div className="board-header">
                            <h2 className="board-header__name">Testboard </h2>
                            <div className="board-header__buttons-container">
                                <button className="board-header__btn material-symbols-outlined md-24">edit</button>
                                <button className="board-header__btn material-symbols-outlined md-24">delete</button>
                            </div>
                        </div>
                        <Feed pins={this.state.pins} key="feed" />
                    </div>
                </div>
            </div>
        );
    }
}
