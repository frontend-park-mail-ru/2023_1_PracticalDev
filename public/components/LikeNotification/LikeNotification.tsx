import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification, IUser } from '../../models';
import { formatDate } from '../../util/formatDate';
import User from '../../models/user';
import './LikeNotification.css';
import { navigate } from '../../actions/navigation';
type LikeNotificationProps = { notification: INotification };
type LikeNotificationState = { author: IUser | undefined };

export class LikeNotification extends Component<LikeNotificationProps, LikeNotificationState> {
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
            <div className="notification">
                <img
                    className="notification__author-avatar"
                    src={this.state.author ? this.state.author.profile_image : ''}
                />
                <div className="notification__info">
                    <div className="notification__text">
                        <strong>{this.state.author ? this.state.author.username : ''} </strong>
                        liked your <strong> pin </strong>
                    </div>
                    <div className="notification__date">{formatDate(this.props.notification.created_at)}</div>
                </div>
                <div
                    className={`notification__read-indicator ${this.props.notification.is_read ? '' : 'active'}`}
                ></div>
            </div>
        );
    }
}
