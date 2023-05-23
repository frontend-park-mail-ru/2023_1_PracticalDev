import { createElement, Component } from '@t1d333/pickpinlib';
import Feed from '../Feed/feed';
import { BoardList } from '../BoardList/boardlist';

import { IBoardWithPins, IUser } from '../../models';
import { IPin } from '../../models';
import { UsersList } from '../UsersList/UsersList';

import './profile-tab.css';
import { showModal } from '../../actions/modal';
import { navigate } from '../../actions/navigation';
import { Loader } from '../Loader/Loader';

type ProfileTabState = {
    currentTab: string;
};

type ProfileTabProps = {
    isLoading: boolean;
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
                return this.props.userContent.pins.length > 0 ? (
                    <Feed pins={this.props.userContent.pins} key="feed" />
                ) : (
                    <div className="profile-tab__empty">
                        <h2 className="profile-tab__empty-header">You have not created any pin</h2>
                        <button
                            className="profile-tab__create-btn"
                            onclick={() => {
                                navigate('/pin-builder');
                            }}
                        >
                            <span className="material-symbols-outlined md-32">add</span>
                            create a pin
                        </button>
                    </div>
                );
            case 'boards':
                return this.props.userContent.boards.length > 0 ? (
                    <BoardList boards={this.props.userContent.boards} />
                ) : (
                    <div className="profile-tab__empty">
                        <h2 className="profile-tab__empty-header">You have not created any boards</h2>
                        <button
                            className="profile-tab__create-btn"
                            onclick={() => {
                                showModal('board-builder');
                            }}
                        >
                            <span className="material-symbols-outlined md-32">add</span>
                            create a board
                        </button>
                    </div>
                );
            case 'followers':
                return <UsersList users={this.props.userContent.followers} />;
            case 'following':
                return this.props.userContent.followees.length > 0 ? (
                    <UsersList users={this.props.userContent.followees} />
                ) : (
                    <div className="profile-tab__empty">
                        <h2 className="profile-tab__empty-header">You don't follow anyone</h2>
                    </div>
                );
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
                                this.state.currentTab === 'following' ? ' profile__tab-btn-active' : 'profile__tab-btn'
                            }
                            onclick={() => {
                                this.switchTab('following');
                            }}
                        >
                            following
                        </span>
                    </div>
                    <button
                        className="profile-tab__settings-btn"
                        onclick={() => {
                            navigate('/settings');
                        }}
                    >
                        <span className="material-symbols-outlined">manage_accounts</span>

                        <span className="profile-tab__settings-btn-text">settings </span>
                    </button>
                </div>

                <div className="profile__tab-content">
                    {this.props.isLoading ? <Loader /> : this.tagToComponent(this.state.currentTab)}
                </div>
            </div>
        );
    }
}
