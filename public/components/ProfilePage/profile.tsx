import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { ProfileTab } from '../ProfileTab/profile-tab';
import { ProfileHeader } from '../ProfileHeader/profile-header';
import Ajax from '../../util/ajax';

import { store } from '../../store/store';
import { IPin, IBoard, IUser } from '../../models';
import { setCommentRange } from 'typescript';
import User from '../../models/user';
import { loadProfile, loadUser } from '../../actions/user';

const fetchProfile = (id: number) => {
    const pinsReq = Ajax.get(`/api/users/${id}/pins`).then((resp) => {
        if (resp.ok) {
            return resp.body as { pins: IPin[] };
        }
    });
    const boardsReq = Ajax.get('/api/boards').then((resp) => {
        if (resp.ok) {
            return resp.body as { boards: IBoard[] };
        }
    });
    return Promise.all([pinsReq, boardsReq]);
};

const dispatchProfile = () => {
    fetchProfile(store.getState().user?.id!).then(([pinsRes, boardsRes]) => {
        let profile: IUser = store.getState().user!;
        profile.pins = pinsRes?.pins || [];
        profile.boards = boardsRes?.boards || [];
        store.dispatch({
            type: 'loadedProfile',
            payload: {
                user: profile,
            },
        });
    });
};

type ProfileProps = {};
type ProfileState = { user: IUser | undefined; pins: IPin[]; boards: IBoard[] };
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

        console.log(store.getState().profilePins);
        this.setState((s) => {
            return { ...s, user: store.getState().user!, pins: store.getState().profilePins };
        });
    }

    componentDidMount(): void {
        User.getMe()
            .then((res) => {
                loadUser(res as IUser);
            })
            .catch((res) => {
                if (res.status === 401) {
                    store.dispatch({ type: 'navigate', payload: { page: '/login' } });
                }
            });

        User.getUserProfile(store.getState().user?.id!).then(([pins, boards]) => {
            loadProfile(pins!, boards!);
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
                            <ProfileHeader
                                key="profile-header"
                                user={this.state.user}
                                //pinsCount={this.state.pins.length}
                                //boardsCount={this.state.boards.length}
                            />
                            <ProfileTab key="profile-tab" userPins={this.state.pins} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
