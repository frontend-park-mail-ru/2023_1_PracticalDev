import { Component, createElement } from '@t1d333/pickpinlib';
import { IUser } from '../../models';
import './UsersList.css';
import { store } from '../../store/store';
import User from '../../models/user';
import { navigate } from '../../actions/navigation';

type UsersListProps = {
    users: IUser[];
};

type UsersListState = {
    subscriptions: Boolean[];
};

export class UsersList extends Component<UsersListProps, UsersListState> {
    protected state: UsersListState = { subscriptions: [] };

    componentDidMount(): void {
        const user = store.getState().user!;
        User.getFollowees(user.id).then((followees) => {
            this.setState(() => {
                return {
                    subscriptions: this.props.users.map((usr) => {
                        return (
                            followees.findIndex((fol) => {
                                return fol.id === usr.id;
                            }) !== -1
                        );
                    }),
                };
            });
        });
    }

    render() {
        return (
            <div className="users-list">
                {...this.props.users.map((user, idx) => {
                    return (
                        <div className="users-list__item">
                            <span className="users-list__user-info">
                                <img className="users-list__item-img" src={user.profile_image} />
                                <span className={'users-list__item-name'}>{user.username}</span>
                            </span>

                            {user.id !== store.getState().user?.id ? (
                                <span className="users-list__btn-container">
                                    <button
                                        className={`user-list__btn ${!this.state.subscriptions[idx] ? 'active' : ''}`}
                                        onclick={() => {
                                            if (this.state.subscriptions[idx]) {
                                                User.unfollow(user.id).then(() => {
                                                    this.setState((s) => {
                                                        this.state.subscriptions[idx] = false;
                                                        return { subscriptions: this.state.subscriptions };
                                                    });
                                                });
                                            } else {
                                                User.follow(user.id).then(() => {
                                                    this.setState((s) => {
                                                        this.state.subscriptions[idx] = true;
                                                        return { subscriptions: this.state.subscriptions };
                                                    });
                                                });
                                            }
                                        }}
                                    >
                                        {this.state.subscriptions[idx] ? 'unfollow' : 'follow'}
                                    </button>
                                    <button
                                        className="user-list__btn"
                                        onclick={() => {
                                            navigate(`/chat/${user.id}`);
                                        }}
                                    >
                                        message
                                    </button>
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }
}
