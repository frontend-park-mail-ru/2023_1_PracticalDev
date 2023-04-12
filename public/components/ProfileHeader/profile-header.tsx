import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IUser } from '../../models';

type ProfileHeaderState = {
    user?: IUser;
    pinsCount?: number;
    boardsCount?: number;
};

type ProfileHeaderProps = {};
export class ProfileHeader extends Component<ProfileHeaderProps, ProfileHeaderState> {
    unsubs: Function[] = [];

    constructor() {
        super();
        this.state = { user: store.getState().user, pinsCount: undefined, boardsCount: undefined };
    }

    loadProfileHandler = () => {
        if (store.getState().type !== 'loadedProfile') {
            return;
        }

        console.log(store);
        this.setState((s) => {
            return {
                ...s,
                user: store.getState().user!,
                pinsCount: store.getState().profilePins.length,
                boardsCount: store.getState().profileBoards.length,
            };
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.loadProfileHandler.bind(this)));
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }
    render() {
        return (
            <div key="profile__header" className="profile__header">
                <div key="profile__user-info" className="profile__user-info">
                    <img
                        key="profile__avatar"
                        className="profile__avatar"
                        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fronaldmottram.co.nz%2Fwp-content%2Fuploads%2F2019%2F01%2Fdefault-user-icon-8.jpg&f=1&nofb=1&ipt=0f4bb63803b8e35bc0848494b5d7e5350abf5edd0d8284b2b2f305a3766a02fc&ipo=images"
                    />
                    <div key="profile__text-container" className="profile__text-container">
                        <div key="profile__username" className="profile__username">
                            {this.state.user ? this.state.user.username : ''}
                        </div>
                        <div key="profile__fullname" className="profile__fullname">
                            <span key="name" className="profile__name">
                                {this.state.user ? this.state.user.name : ''}
                            </span>
                            <span key="surname" className="profile__surname"></span>
                        </div>
                    </div>
                </div>
                <div key="stat" className="profile__statistics">
                    <div key="boards-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            {`${this.state.pinsCount ?? ''}`}
                        </span>
                        <span key="profile__stat-name" className="profile__stat-name">
                            pins
                        </span>
                    </div>
                    <div key="pins-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            {`${this.state.boardsCount ?? ''}`}
                        </span>
                        <span key="profile__stat-name" className="profile__stat-name">
                            boards
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
