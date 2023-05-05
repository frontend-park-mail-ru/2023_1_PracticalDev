import { createElement, Component } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { BoardList } from '../BoardList/boardlist';

import { IBoardWithPins, IUser } from '../../models';
import { IPin } from '../../models';
import { UsersList } from '../UsersList/UsersList';

type ProfileTabState = {
    currentTab: string;
};

type ProfileTabProps = {
    userContent: { pins: IPin[]; boards: IBoardWithPins[]; followers: IUser[]; followees: IUser[] };
};

export class ProfileTab extends Component<ProfileTabProps, ProfileTabState> {
    constructor() {
        super();
        this.state = { currentTab: 'pins' };
    }

    private tagToComponent = (tag: string) => {
        switch (tag) {
            case 'pins':
                return <Feed pins={this.props.userContent.pins} key="feed" />;
            case 'boards':
                return <BoardList boards={this.props.userContent.boards} />;
            case 'followers':
                return <UsersList users={this.props.userContent.followers} />;
            case 'followees':
                return <UsersList users={this.props.userContent.followees} />;

            default:
                break;
        }
    };

    switchTab = (newTab: string) => {
        if (newTab !== this.state.currentTab) {
            this.setState((s: ProfileTabState) => {
                return { ...s, currentTab: newTab };
            });
        }
    };

    render() {
        return (
            <div className="profile__tab-container">
                <div className="profile__tab-menu">
                    <div className="profile__tab-buttons">
                        <span
                            className={
                                this.state.currentTab === 'pins' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('pins');
                            }}
                        >
                            pins
                        </span>
                        <span
                            className={
                                this.state.currentTab === 'boards' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('boards');
                            }}
                        >
                            boards
                        </span>
                        <span
                            className={
                                this.state.currentTab === 'followers' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('followers');
                            }}
                        >
                            followers
                        </span>
                        <span
                            className={
                                this.state.currentTab === 'followees' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('followees');
                            }}
                        >
                            followees
                        </span>
                    </div>

                    <span className="profile__creation-btn">
                        <a
                            key="pin-creation-btn"
                            href={this.state.currentTab === 'pins' ? '/pin-builder' : '/board-builder'}
                            className="material-symbols-outlined profile__creation-btn-icon md-32"
                        >
                            add
                        </a>
                    </span>
                </div>
                <div className="profile__tab-content">{this.tagToComponent(this.state.currentTab)}</div>
            </div>
        );
    }
}
