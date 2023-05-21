import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
import { IUser } from '../../models';
import { ChatWs } from '../../util/chatWs';
import { Notification } from '../../models/notification';
import { loadNotifications } from '../../actions/notification';
type AuthRequiredProps = {
    children: VNode[];
};
type AuthRequiredState = {
    isLoading: boolean;
};
export default class AuthRequired extends Component<AuthRequiredProps, AuthRequiredState> {
    constructor() {
        super();
        const chat = store.getState().chatConnection;
        const notifications = store.getState().notificationConnection;

        if (!chat) ChatWs.createSocket();

        if (!notifications) Notification.createSocket();

        this.state = { isLoading: true };
    }
    componentDidMount(): void {
        User.getMe()
            .then((user) => {
                Notification.getNotifications().then((notifications) => {
                    loadNotifications(notifications);
                    loadUser(user as IUser);
                    this.setState((s) => {
                        return { isLoading: false };
                    });
                });
            })
            .catch(() => {
                navigate('/login');
                console.log(res)
            });
    }

    render(): VNode {
        return <div>{...!this.state.isLoading ? this.props.children : []}</div>;
    }
}
