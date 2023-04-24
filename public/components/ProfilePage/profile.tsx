import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { ProfileTab } from '../ProfileTab/profile-tab';
import { ProfileHeader } from '../ProfileHeader/profile-header';

import { store } from '../../store/store';
import { IPin, IUser, IBoardWithPins } from '../../models';
import User from '../../models/user';
import { loadProfile, loadUser } from '../../actions/user';
import { navigate } from '../../actions/navigation';

type ProfileProps = {};
type ProfileState = { user: IUser | undefined; pins: IPin[]; boards: IBoardWithPins[]; followers: IUser[], followees: IUser[] };
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

    componentDidMount(): void {
        User.getMe()
            .then((res) => {
                loadUser(res as IUser);
                return res;
            })
            .then((res) => {
                User.getUserProfile(res.id).then(([pins, boards, followers, followees]) => {
                    loadProfile(pins!, boards!, followers!, followees!);
                });
            })
            .catch((res) => {
                if (res.status === 401) {
                    navigate('/login')
                }
            });

        this.unsubs.push(store.subscribe(this.profileLoadHandler.bind(this)));
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    render() {
        return (
            <div>
                <Menu />
                <Header />
                <div id="app">
                    <div className="main__content">
                        <div className="profile__container">
                            <ProfileHeader user={this.state.user} />
                            <ProfileTab
                                userContent={{
                                    pins: this.state.pins || [],
                                    boards: this.state.boards || [],
                                    followers: this.state.followers || [],
                                    followees: this.state.followees || []
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

