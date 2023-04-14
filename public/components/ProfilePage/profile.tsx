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
            user: {},
            pins: [],
            boards: [],
        };
    }
    profileLoadHandler() {
        if (store.getState().type !== 'loadedProfile') {
            return;
        }

        this.setState((s) => {
            console.log(store);
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
            <div key="wrapper">
                <Menu key="menu" />
                <Header
                    key="header"
                    username="username"
                    avatarSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                />
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <div className="profile__container">
                            <ProfileHeader key="profile-header" user={this.state.user} />
                            <ProfileTab
                                key="profile-tab"
                                userContent={{ pins: this.state.pins || [], boards: this.state.boards || [] }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
