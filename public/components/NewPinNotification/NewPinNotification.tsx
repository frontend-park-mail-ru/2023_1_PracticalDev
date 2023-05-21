import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification, IPin, IUser } from '../../models';
import { store } from '../../store/store';
import { loadNotifications } from '../../actions/notification';
import { Notification } from '../../models/notification';
import { navigate } from '../../actions/navigation';
import { formatDate } from '../../util/formatDate';
import User from '../../models/user';
import { Pin } from '../../models/pin';
import './NewPinNotification.css';
type NewPinNotificationProps = { notification: INotification };
type NewPinNotificationState = {
    author: IUser | undefined;
    pin: IPin | undefined;
};

export class NewPinNotification extends Component<NewPinNotificationProps, NewPinNotificationState> {
    constructor() {
        super();
        this.state = { author: undefined, pin: undefined };
    }
    componentDidMount(): void {
        Pin.getPin(this.props.notification.data.pin_id).then((pin) => {
            User.getUser(pin.author_id).then((user) => {
                this.setState(() => {
                    return { pin: pin, author: user };
                });
            });
        });
    }

    render() {
        return (
            <div
                className="notification new-pin-notification"
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
                }}
            >
                <img
                    className="notification__author-avatar"
                    src={this.state.author ? this.state.author.profile_image : ''}
                />

                <div className="notification__info">
                    <div className="notification__text">
                        <strong>{this.state.author ? this.state.author.username : ''} </strong>
                        created new pin
                    </div>
                    <div className="notification__date">{formatDate(this.props.notification.created_at)}</div>
                </div>
                <div
                    className={`notification__read-indicator ${this.props.notification.is_read ? '' : 'active'}`}
                ></div>
                <div
                    className="notification__pin-preview"
                    style={`background-color: ${this.state.pin ? this.state.pin.media_source_color : ''};`}
                >
                    <img
                        src={this.state.pin ? this.state.pin.media_source : ''}
                        className="notification__pin-preview-img"
                    />
                </div>
            </div>
        );
    }
}
