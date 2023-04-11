import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IUser } from '../../models';

type ProfileHeaderState = {};

type ProfileHeaderProps = {
    user: IUser;
    boardsCount: number;
    pinsCount: number;
};
export class ProfileHeader extends Component<ProfileHeaderProps, ProfileHeaderState> {
    componentDidMount(): void {
        console.log(this.props);
    }

    componentDidUpdate(): void {
        console.log(this.props);
    }

    render() {
        return (
            <div key="profile__header" className="profile__header">
                <div key="profile__user-info" className="profile__user-info">
                    <img
                        key="profile__avatar"
                        className="profile__avatar"
                        src="https://forum.golangbridge.org/uploads/default/original/2X/0/03cbc1a9f9178055093eb0c25ba9df2c29611671.jpg"
                    />
                    <div key="profile__text-container" className="profile__text-container">
                        <div key="profile__username" className="profile__username">
                            {this.props.user.username || ''}
                        </div>
                        <div key="profile__fullname" className="profile__fullname">
                            <span key="name" className="profile__name">
                                {this.props.user.name || ''}
                            </span>
                            <span key="surname" className="profile__surname"></span>
                        </div>
                    </div>
                </div>
                <div key="stat" className="profile__statistics">
                    <div key="boards-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            {`${this.props.pinsCount}`}
                        </span>
                        <span key="profile__stat-name" className="profile__stat-name">
                            pins
                        </span>
                    </div>
                    <div key="pins-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            {`${this.props.boardsCount}`}
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
