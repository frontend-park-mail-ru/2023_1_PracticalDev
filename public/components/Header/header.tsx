import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { Searchbar } from '../Searchbar/Searchbar';
import { navigate } from '../../actions/navigation';
import { ActionList } from '../ActionList/ActionList';

import './header.css';
import { NotificationList } from '../NotificationList/NotificationList';
import { INotification } from '../../models';

import './header.css';

type HeaderProps = {};

type HeaderState = {
    avatarSrc: string | undefined;
    actionListVisible: boolean;
    notificationListVisible: boolean;
    notifications: INotification[];
};

export class Header extends Component<HeaderProps, HeaderState> {
    constructor() {
        super();
        this.state = {
            avatarSrc: store.getState().user?.profile_image,
            actionListVisible: false,
            notificationListVisible: false,
            notifications: store.getState().notifications,
        };
    }

    private unsubs: Function[] = [];

    onNewNotification() {
        if (store.getState().type !== 'newNotification') return;
        this.setState((state) => {
            return { ...state, notifications: store.getState().notifications, hasUnreadNotification: true };
        });
    }

    onLoadNotificatoins() {
        if (store.getState().type !== 'loadNotifications') return;
        this.setState((state) => {
            return { ...state, notifications: store.getState().notifications };
        });
    }

    onCloseActionList(event: any) {
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
    }

    onCloseNotificationList(event: any) {
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
    }

    componentDidMount(): void {
        window.addEventListener('click', this.onCloseActionList.bind(this));
        window.addEventListener('click', this.onCloseNotificationList.bind(this));
        this.unsubs.push(store.subscribe(this.onLoadNotificatoins.bind(this)));
        this.unsubs.push(store.subscribe(this.onNewNotification.bind(this)));
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
                            <span className="material-symbols-outlined md-32">notifications</span>
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
