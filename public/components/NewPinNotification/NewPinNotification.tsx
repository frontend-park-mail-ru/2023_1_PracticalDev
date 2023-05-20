import { Component, createElement } from '@t1d333/pickpinlib';
import { INotification } from '../../models';

type NewPinNotificationProps = { notification: INotification };
type NewPinNotificationState = {};

export class NewPinNotification extends Component<NewPinNotificationProps, NewPinNotificationState> {
    render() {
        return <div className="new-pin-notification"></div>;
    }
}
