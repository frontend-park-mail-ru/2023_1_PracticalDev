import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { store } from '../../store/store';
import { navigate } from '../../actions/navigation';
import { IUser } from '../../models';
type AuthRequiredProps = {
    children: VNode[];
};

export default class AuthRequired extends Component<AuthRequiredProps, {}> {
    componentDidMount(): void {
        User.getMe()
            .then((res) => {
                loadUser(res as IUser);
            })
            .catch((res) => {
                navigate('/login');
            });
    }

    render(): VNode {
        return <div>{...this.props.children}</div>;
    }
}
