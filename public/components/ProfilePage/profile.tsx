import { Component, createElement } from '@t1d333/pickpinlib';
import { ProfileTab } from '../ProfileTab/profile-tab';
import { ProfileHeader } from '../ProfileHeader/profile-header';
import { store } from '../../store/store';
import { IPin, IUser, IBoardWithPins } from '../../models';
import User from '../../models/user';
import { loadProfile } from '../../actions/user';
import { Main } from '../Main/main';

import './profile.css';

type ProfileProps = {};
type ProfileState = {
    user: IUser | undefined;
    pins: IPin[];
    boards: IBoardWithPins[];
    followers: IUser[];
    followees: IUser[];
};
export class ProfileScreen extends Component<ProfileProps, ProfileState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = {
            user: undefined,
            pins: [],
            boards: [],
            followers: [],
            followees: [],
        };
    }

    profileLoadHandler() {
        if (store.getState().type !== 'loadedProfile') {
            return;
        }

        this.setState((s) => {
            return {
                ...s,
                user: store.getState().user!,
                pins: store.getState().profilePins,
                boards: store.getState().profileBoards,
                followers: store.getState().followers,
                followees: store.getState().followees,
            };
        });
    }

    userLoadHandler() {
        if (store.getState().type !== 'loadedUser') {
            return;
        }
        User.getUserProfile(store.getState().user!.id).then(([pins, boards, followers, followees]) => {
            loadProfile(pins!, boards!, followers!, followees!);
        });
    }

    componentDidMount(): void {
        if (store.getState().user) {
            User.getUserProfile(store.getState().user!.id).then(([pins, boards, followers, followees]) => {
                loadProfile(pins!, boards!, followers!, followees!);
            });
        } else {
            this.unsubs.push(store.subscribe(this.userLoadHandler.bind(this)));
        }
        this.unsubs.push(store.subscribe(this.profileLoadHandler.bind(this)));
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    render() {
        return (
            <Main>
                <div className="profile__container">
                    <ProfileHeader user={this.state.user} />
                    <ProfileTab
                        userContent={{
                            pins: this.state.pins || [],
                            boards: this.state.boards || [],
                            followers: this.state.followers || [],
                            followees: this.state.followees || [],
                        }}
                    />
                </div>
            </Main>
        );
    }
}
