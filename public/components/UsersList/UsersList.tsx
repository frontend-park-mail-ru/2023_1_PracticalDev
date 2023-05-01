import { Component, createElement } from '@t1d333/pickpinlib';
import { IUser } from '../../models';
import './UsersList.css';
import { store } from '../../store/store';
import User from '../../models/user';

type UsersListProps = {
    users: IUser[];
};

type UsersListState = {
    subscriptions: Boolean[];
};
export class UsersList extends Component<UsersListProps, UsersListState> {
    constructor() {
        super();
        this.state = { subscriptions: [] };
    }

    componentDidMount(): void {
        User.getMe().then((user: IUser) => {
            User.getFollowees(user.id).then((followees) => {
                this.setState((s) => {
                    return {
                        subscriptions: this.props.users.map((user) => {
                            return (
                                followees.filter((fol) => {
                                    return fol.id === user.id;
                                }).length > 0
                            );
                        }),
                    };
                });
            });
        });
    }
    render() {
        return (
            <div className="users-list">
                {...this.props.users.map((user, idx) => {
                    return (
                        <div className="users-list__item">
                            <span>
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
                                    <button className="user-list__btn">message</button>
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
