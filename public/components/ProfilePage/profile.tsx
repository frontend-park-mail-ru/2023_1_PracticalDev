import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { ProfileTab } from '../ProfileTab/profile-tab';
import { ProfileHeader } from '../ProfileHeader/profile-header';

import { store } from '../../store/store';
import { IPin, IBoard, IUser, IBoardWithPins } from '../../models';
import User from '../../models/user';
import { loadProfile, loadUser } from '../../actions/user';

type ProfileProps = {};
type ProfileState = { user: IUser | undefined; pins: IPin[]; boards: IBoardWithPins[] };
export class ProfileScreen extends Component<ProfileProps, ProfileState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = {
            user: undefined,
            pins: [],
            boards: [],
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
                User.getUserProfile(res.id).then(([pins, boards]) => {
                    loadProfile(pins!, boards!);
                });
            })
            .catch((res) => {
                if (res.status === 401) {
                    store.dispatch({ type: 'navigate', payload: { page: '/login' } });
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
                                userContent={{ pins: this.state.pins || [], boards: this.state.boards || [] }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
