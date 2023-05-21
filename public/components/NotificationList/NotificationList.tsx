import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification } from '../../models';
import { store } from '../../store/store';
import './NotificationList.css';
import { NewPinNotification } from '../NewPinNotification/NewPinNotification';
import { LikeNotification } from '../LikeNotification/LikeNotification';
import { CommentNotification } from '../NewCommentNotification/NewCommentNotification';
import { NewFollowerNotification } from '../NewFollowerNotification/NewFollowerNotification';
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
                return <CommentNotification notification={notification} />;
            case 'new_follower':
                return <NewFollowerNotification notification={notification} />;
            default:
                return <div>Error</div>;
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

    onLoadNotifications() {
        if (store.getState().type !== 'loadNotifications') return;
        this.setState((state) => {
            return { ...state, notifications: store.getState().notifications };
        });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onNewNotification.bind(this)));
        this.unsubs.push(store.subscribe(this.onLoadNotifications.bind(this)));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }

    render() {
        return (
            <div className="notification-list">
                {...this.state.notifications.length > 0
                    ? this.state.notifications
                          .sort((lhs, rhs) => {
                              if (lhs.is_read == rhs.is_read) {
                                  return lhs.created_at < rhs.created_at ? -1 : 1;
                              }
                              return !lhs.is_read ? 1 : -1;
                          })
                          .map((notification) => {
                              return this.getNotificatonComponent(notification);
                          })
                    : [<h3 className="notification-list__empty">No new notificatoins</h3>]}
            </div>
        );
    }
}
