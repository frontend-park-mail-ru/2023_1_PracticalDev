import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification, IUser } from '../../models';
import { formatDate } from '../../util/formatDate';
import User from '../../models/user';
import { navigate } from '../../actions/navigation';
import { store } from '../../store/store';
import { loadNotifications } from '../../actions/notification';
import { Notification } from '../../models/notification';
import './NewFollowerNotification.css';
type NewFollowerNotificationProps = { notification: INotification };
type NewFollowerNotificationState = { author: IUser | undefined };

export class NewFollowerNotification extends Component<NewFollowerNotificationProps, NewFollowerNotificationState> {
    constructor() {
        super();
        this.state = {
            author: undefined,
        };
    }

    componentDidMount(): void {
        User.getUser(this.props.notification.data.follower_id).then((user) => {
            this.setState(() => {
                return { author: user };
            });
        });
    }

    render() {
        return (
            <div className="notification new-follower-notification">
                <img
                    className="notification__author-avatar"
                    src={this.state.author ? this.state.author.profile_image : ''}
                />
                <div className="notification__info">
                    <div className="notification__text">
                        <strong>{this.state.author ? this.state.author.username : ''} </strong>
                        started follow you
                    </div>
                    <div className="notification__date">{formatDate(this.props.notification.created_at)}</div>
                </div>
                <div
                    className={`notification__read-indicator ${this.props.notification.is_read ? '' : 'active'}`}
                ></div>

                <div className="new-follower-notification__actions">
                    <button className="new-follower-notification__follow-btn">follow</button>
                    <button
                        className="new-follower-notification__hide-btn"
                        onclick={(event: any) => {
                            const notifications = store.getState().notifications;
                            loadNotifications(
                                notifications.filter((notification) => {
                                    return notification !== this.props.notification;
                                }),
                            );
                            Notification.readNotification(this.props.notification);
                            event.stopPropagation();
                        }}
                    >
                        hide
                    </button>
                </div>
            </div>
        );
    }
}
