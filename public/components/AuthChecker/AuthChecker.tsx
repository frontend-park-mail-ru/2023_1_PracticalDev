import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
import { IUser } from '../../models';
import { ChatWs } from '../../util/chatWs';
import { Notification } from '../../models/notification';
import { loadNotifications } from '../../actions/notification';
type AuthCheckerProps = {
    children: VNode[];
    authRequired: boolean;
};
type AuthCheckerState = {
    isLoading: boolean;
};
export default class AuthChecker extends Component<AuthCheckerProps, AuthCheckerState> {
    protected state: AuthCheckerState = {
        isLoading: true,
    };

    componentDidMount(): void {
        User.getMe()

            .then((user) => {
                const chat = store.getState().chatConnection;
                const notifications = store.getState().notificationConnection;

                if (!chat) ChatWs.createSocket();

                if (!notifications) Notification.createSocket();

                Notification.getNotifications().then((notifications) => {
                    loadNotifications(notifications);
                    loadUser(user as IUser);
                    this.setState(() => {
                        return { isLoading: false };
                    });
                });
            })
            .catch(() => {
                if (this.props.authRequired) {
                    navigate('/login');
                    return;
                }

                this.setState(() => {
                    return { isLoading: false };
                });
            });
    }

    render(): VNode {
        return <div>{...!this.state.isLoading ? this.props.children : []}</div>;
    }
}
