import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { Searchbar } from '../Searchbar/Searchbar';
import { navigate } from '../../actions/navigation';
import { ActionList } from '../ActionList/ActionList';

import './header.css';
import { NotificationList } from '../NotificationList/NotificationList';
import { INotification, IUser } from '../../models';

import './header.css';

type HeaderProps = {};

type HeaderState = {
    user: IUser | undefined;
    actionListVisible: boolean;
    notificationListVisible: boolean;
    notifications: INotification[];
};

export class Header extends Component<HeaderProps, HeaderState> {
    constructor() {
        super();
        this.state = {
            user: store.getState().user,
            actionListVisible: false,
            notificationListVisible: false,
            notifications: store.getState().notifications,
        };
    }

    private unsubs: Function[] = [];

    onNewNotification = () => {
        if (store.getState().type !== 'newNotification') return;
        this.setState((state) => {
            return { ...state, notifications: store.getState().notifications, hasUnreadNotification: true };
        });
    };

    onLoadNotificatoins = () => {
        if (store.getState().type !== 'loadNotifications') return;
        this.setState((state) => {
            return { ...state, notifications: store.getState().notifications };
        });
    };

    onCloseActionList = (event: any) => {
        if (this.state.actionListVisible) {
            if (!event.target.classList.contains('header__action-list-wrapper')) {
                this.setState((state) => {
                    return {
                        ...state,
                        actionListVisible: false,
                    };
                });
            }
        }
    };

    onCloseNotificationList = (event: any) => {
        if (this.state.notificationListVisible) {
            if (!event.target.classList.contains('header__notification-list-wrapper')) {
                this.setState((state) => {
                    return {
                        ...state,
                        notificationListVisible: false,
                    };
                });
            }
        }
    };

    onLoadUser = () => {
        if (store.getState().type !== 'loadedUser') return;
        this.setState((state) => {
            return { ...state, user: store.getState().user };
        });
    };

    componentDidMount(): void {
        window.addEventListener('click', this.onCloseActionList);
        window.addEventListener('click', this.onCloseNotificationList);
        this.unsubs.push(store.subscribe(this.onLoadNotificatoins));
        this.unsubs.push(store.subscribe(this.onNewNotification));
        this.unsubs.push(store.subscribe(this.onLoadUser));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });

        window.removeEventListener('click', this.onCloseActionList);
        window.removeEventListener('click', this.onCloseNotificationList);
    }

    render() {
        return (
            <div className="header">
                <div className="header__search-block">
                    <div className="header__search-wrapper">
                        <Searchbar />
                    </div>
                    <div className="header__creation-block">
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
                        <span className={`header__action-list-wrapper ${this.state.actionListVisible ? 'active' : ''}`}>
                            <ActionList />
                        </span>
                    </div>
                </div>

                {this.state.user ? (
                    <div className="header__user-block">
                        <div
                            className={`header__notification-block ${
                                this.state.notifications.some((notification) => {
                                    return !notification.is_read;
                                })
                                    ? 'has-unread'
                                    : ''
                            }`}
                        >
                            <button
                                className="header__btn"
                                onclick={(event: any) => {
                                    this.setState((state) => {
                                        return {
                                            ...state,
                                            notificationListVisible: !state.notificationListVisible,
                                            hasUnreadNotification: false,
                                        };
                                    });
                                    event.stopPropagation();
                                }}
                            >
                                <span className="material-symbols-outlined md-32 icon">notifications</span>
                            </button>
                            <span
                                className={`header__notification-list-wrapper ${
                                    this.state.notificationListVisible ? 'active' : ''
                                }`}
                            >
                                <NotificationList />
                            </span>
                        </div>
                        <button
                            className="header__btn"
                            onclick={() => {
                                navigate('/chats');
                            }}
                        >
                            <span className="material-symbols-outlined md-32 icon">chat</span>
                        </button>
                        <img
                            onclick={() => {
                                navigate('/profile');
                            }}
                            className="header__avatar"
                            src={this.state.user ? this.state.user.profile_image : ''}
                        />
                    </div>
                ) : (
                    <div className="header__unauthorized-block">
                        <button
                            className="header__login-btn"
                            onclick={() => {
                                navigate('/login');
                            }}
                        >
                            Sign in
                        </button>
                        <button
                            className="header__signup-btn"
                            onclick={() => {
                                navigate('/signup');
                            }}
                        >
                            Sign up
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
