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
                        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1&ipt=0f4bb63803b8e35bc0848494b5d7e5350abf5edd0d8284b2b2f305a3766a02fc&ipo=images"
                    />
                </div>
            </div>
        );
    }
}
