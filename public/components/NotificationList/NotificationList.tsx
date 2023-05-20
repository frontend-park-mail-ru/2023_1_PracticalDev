import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification } from '../../models';
import { store } from '../../store/store';
import './NotificationList.css';
import { NewPinNotification } from '../NewPinNotification/NewPinNotification';
import { LikeNotification } from '../LikeNotification/LikeNotification';
import { isFunctionOrConstructorTypeNode } from 'typescript';
type NotificationListProps = {};
type NotificationListState = {
    notifications: INotification[];
};

export class NotificationList extends Component<NotificationListProps, NotificationListState> {
    unsubs: Function[] = [];
    constructor() {
        super();
        this.state = {
            notifications: store.getState().notifications,
        };
    }

    getNotificatonComponent(notification: INotification) {
        switch (notification.type) {
            case 'new_pin':
                return <NewPinNotification notification={notification} />;
            case 'new_like':
                return <LikeNotification notification={notification} />;
            case 'new_comment':
                return <div> Test</div>;
            case 'new_subscribe':
                return <div> Test</div>;
            default:
                return <div> Test</div>;
        }
    }

    onNewNotification() {
        if (store.getState().type !== 'newNotification') return;
        const notification = store.getState().newNotification!;
        this.setState((state) => {
            return {
                ...state,
                notifications: [notification, ...state.notifications],
            };
        });
    }

    componentDidMount(): void {
        store.subscribe(this.onNewNotification.bind(this));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }

    render() {
        return (
            <div className="notification-list">
                {...this.state.notifications
                    .sort((lhs, rhs) => {
                        if (lhs.is_read == rhs.is_read) {
                            return lhs.created_at < rhs.created_at ? -1 : 1;
                        }
                        return !lhs.is_read ? -1 : 1;
                    })
                    .map((notification) => {
                        return this.getNotificatonComponent(notification);
                    })}
            </div>
        );
    }
}
