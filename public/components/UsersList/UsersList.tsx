import { Component, createElement } from '@t1d333/pickpinlib';
import { IUser } from '../../models';
import './UsersList.css';

type UsersListProps = {
    users: (IUser & { isFollowing: boolean })[];
};

export class UsersList extends Component<UsersListProps, {}> {
    render() {
        return (
            <div className="users-list">
                {...this.props.users.map((user) => {
                    return (
                        <div className="users-list__item">
                            <img className="users-list__item-img" src={user.profile_image} />
                            <span className={'users-list__item-name'}>{user.name}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}
