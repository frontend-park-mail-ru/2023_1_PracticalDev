import { Component, createElement } from '@t1d333/pickpinlib';
import { Input } from '../Input/input';
import { store } from '../../store/store';

type HeaderProps = {};

type HeaderState = {
    username: string;
    avatarSrc: string;
};

export class Header extends Component<HeaderProps, HeaderState> {
    private unsubs: Function[] = [];
    private userLoadHandler = () => {
        if (store.getState().type !== 'loadedUser') {
            return;
        }

        this.setState((s) => {
            return { ...s, username: store.getState().user?.username || '' };
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.userLoadHandler.bind(this)));
    }

    render() {
        return (
            <div key="header" className="header">
                <div key="header__search-wrapper" className="header__search-wrapper">
                    <Input key="search-input" type="search" name="search" icon="search" />
                </div>
                <div key="header__user-block" className="header__user-block">
                    <button key="header__notify-btn" className="header__btn">
                        <span key="notfy-symbol" className="material-symbols-outlined md-32">
                            notifications
                        </span>
                    </button>
                    <button key="header__chat-btn" className="header__btn">
                        <span key="chat-symbol" className="material-symbols-outlined md-32">
                            chat
                        </span>
                    </button>
                    <img
                        className="header__avatar"
                        key="header__avatar"
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                    />
                    <span key="header__username" className="header__username">
                        {store.getState().user?.username || ''}
                    </span>
                </div>
            </div>
        );
    }
}
