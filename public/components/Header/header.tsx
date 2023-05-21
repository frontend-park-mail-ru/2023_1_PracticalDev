import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { Searchbar } from '../Searchbar/Searchbar';
import { navigate } from '../../actions/navigation';
import { ActionList } from '../ActionList/ActionList';

import './header.css';

type HeaderProps = {};

type HeaderState = {
    avatarSrc: string | undefined;
    actionListVisible: boolean;
};

export class Header extends Component<HeaderProps, HeaderState> {
    constructor() {
        super();
        this.state = { avatarSrc: store.getState().user?.profile_image, actionListVisible: false };
    }

    private unsubs: Function[] = [];

    private userLoadHandler = () => {
        if (store.getState().type !== 'loadedUser') {
            return;
        }

        this.setState((s) => {
            return {
                ...s,
                avatarSrc: store.getState().user?.profile_image || undefined,
            };
        });
    };

    onCloseActionList = (event: any) => {
        if (!this.state.actionListVisible) return;
        if (event.target.classList.contains('header__action-list')) return;
        this.setState((state) => {
            return {
                ...state,
                actionListVisible: false,
            };
        });
    };

    componentDidMount(): void {
        window.addEventListener('click', this.onCloseActionList.bind(this));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });

        window.removeEventListener('click', this.onCloseActionList);
    }

    render() {
        return (
            <div className="header">
                <div className="header__search-block">
                    <div className="header__search-wrapper">
                        <Searchbar />
                    </div>
                    <div className="header__creation-block">
                        <span className="header__creation-btn">
                            <button
                                onclick={(event: any) => {
                                    this.setState((state) => {
                                        return { ...state, actionListVisible: !state.actionListVisible };
                                    });
                                    event.stopPropagation();
                                }}
                                className="material-symbols-outlined header__creation-btn-icon md-40"
                            >
                                add
                            </button>
                        </span>
                        <span className={`header__action-list-wrapper ${this.state.actionListVisible ? 'active' : ''}`}>
                            <ActionList />
                        </span>
                    </div>
                </div>

                <div className="header__user-block">
                    <button className="header__btn">
                        <span className="material-symbols-outlined md-32">notifications</span>
                    </button>
                    <button
                        className="header__btn"
                        onclick={() => {
                            navigate('/chats');
                        }}
                    >
                        <span className="material-symbols-outlined md-32">chat</span>
                    </button>
                    <img
                        onclick={() => {
                            navigate('/profile');
                        }}
                        className="header__avatar"
                        src={
                            this.state.avatarSrc ??
                            'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1&ipt=0f4bb63803b8e35bc0848494b5d7e5350abf5edd0d8284b2b2f305a3766a02fc&ipo=images'
                        }
                    />
                </div>
            </div>
        );
    }
}
