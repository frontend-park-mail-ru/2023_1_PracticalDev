import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
import { IUser } from '../../models';
import { ChatWs } from '../../util/chatWs';
type AuthRequiredProps = {
    children: VNode[];
};
type AuthRequiredState = {
    isLoading: boolean;
};
export default class AuthRequired extends Component<AuthRequiredProps, AuthRequiredState> {
    constructor() {
        super();
        const ws = store.getState().wsConnection;
        if (!ws) {
            ChatWs.createSocket();
        }
        this.state = { isLoading: true };
    }
    componentDidMount(): void {
        User.getMe()
            .then((res) => {
                loadUser(res as IUser);
                this.setState((s) => {
                    return { isLoading: false };
                });
            })
            .catch((res) => {
                navigate('/login');
            });
    }

    render(): VNode {
        return <div key="3">{...!this.state.isLoading ? this.props.children : []}</div>;
    }
}
