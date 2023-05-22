import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification, IUser } from '../../models';
import { formatDate } from '../../util/formatDate';
import User from '../../models/user';
import { navigate } from '../../actions/navigation';
import { store } from '../../store/store';
import { loadNotifications } from '../../actions/notification';
import { Notification } from '../../models/notification';
import './NewCommentNotification.css';
type CommentNotificationProps = { notification: INotification };
type CommentNotificationState = { author: IUser | undefined };

export class CommentNotification extends Component<CommentNotificationProps, CommentNotificationState> {
    constructor() {
        super();
        this.state = {
            author: undefined,
        };
    }

    componentDidMount(): void {
        User.getUser(this.props.notification.data.author_id).then((user) => {
            this.setState(() => {
                return { author: user };
            });
        });
    }

    render() {
        return (
            <div
                className="notification comment-notification"
                onclick={() => {
                    const notifications = store.getState().notifications;

                    if (!this.props.notification.is_read) {
                        loadNotifications(
                            notifications.map((notification) => {
                                if (notification !== this.props.notification) return notification;
                                return { ...notification, is_read: true };
                            }),
                        );
                        Notification.readNotification(this.props.notification);
                    }

                    navigate(`/pin/${this.props.notification.data.pin_id}`);
                    store.dispatch({ type: 'updatePin', payload: { pinId: this.props.notification.data.pin_id } });
                }}
            >
                <img
                    className="notification__author-avatar"
                    src={this.state.author ? this.state.author.profile_image : ''}
                />
                <div className="notification__info">
                    <div className="notification__text">
                        <strong>{this.state.author ? this.state.author.username : ''} </strong>
                        commented on your pin
                    </div>
                    <div className="notification__date">{formatDate(this.props.notification.created_at)}</div>
                </div>
                <div
                    className={`notification__read-indicator ${this.props.notification.is_read ? '' : 'active'}`}
                ></div>
                <div className="notification__comment-preview">{this.props.notification.data.text}</div>
            </div>
        );
    }
}
