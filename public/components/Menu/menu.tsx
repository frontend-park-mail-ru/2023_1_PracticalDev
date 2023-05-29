import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import User from '../../models/user';
import { logoutUser } from '../../actions/user';
import { navigate } from '../../actions/navigation';

import './menu.css';
import { showModal } from '../../actions/modal';

const checkAuth = (link: string) => {
    if (store.getState().user) {
        navigate(link);
    } else {
        showModal('login');
    }
};

const menuItems = [
    {
        link: '/feed',
        name: 'home',
        callback: () => {
            navigate('/feed');
        },
    },
    {
        link: '/chats',
        name: 'chat',
        callback: checkAuth.bind(this, '/chats'),
    },
    {
        link: undefined,
        name: 'add',
        callback: () => {
            showModal('action-list');
        },
    },
    {
        link: '/profile',
        name: 'person',
        callback: checkAuth.bind(this, '/profile'),
    },
    {
        link: '/favorite',
        name: 'favorite',
        callback: checkAuth.bind(this, '/favorite'),
    },
    {
        link: '/login',
        name: 'login',
        callback: navigate.bind(this, '/login'),
    },
];

type MenuState = { isAuthorized: boolean };
type MenuProps = {};

export default class Menu extends Component<MenuProps, MenuState> {
    protected state = {
        isAuthorized: store.getState().user !== undefined,
    };

    constructor() {
        super();
        if (
            this.state.isAuthorized &&
            menuItems.findIndex((item) => {
                return item.link === '/login';
            }) !== -1
        ) {
            menuItems.pop();
        }
    }

    private unsubs: Function[] = [];
    private onLogin = () => {
        if (store.getState().type !== 'loadedUser') return;

        if (
            menuItems.findIndex((item) => {
                return item.link === '/login';
            }) !== -1
        ) {
            menuItems.pop();
        }

        this.setState(() => {
            return {
                isAuthorized: true,
            };
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onLogin));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }
    private logoutCallback() {
        User.logout().then(() => {
            logoutUser();
        });
    }

    render() {
        return (
            <div className="menu">
                <div className="menu__logo-container">
                    <img className="menu__logo" src="/static/img/Logo2.svg" onclick={navigate.bind(this, '/feed')} />
                </div>
                <div className="menu__box">
                    {...menuItems.map((item) => {
                        return (
                            <span
                                className="menu__item"
                                onclick={() => {
                                    if (item.callback) {
                                        item.callback();
                                    }
                                }}
                            >
                                <span className={'material-symbols-outlined md-32 menu__link'}>{item.name}</span>
                            </span>
                        );
                    })}
                </div>
                {this.state.isAuthorized ? (
                    <button className="menu__loguout-btn material-symbols-outlined md-32" onclick={this.logoutCallback}>
                        logout
                    </button>
                ) : (
                    <div />
                )}
            </div>
        );
    }
}
