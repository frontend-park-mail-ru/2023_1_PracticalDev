import { Component, createElement } from '@t1d333/pickpinlib';

export class ProfileHeader extends Component<{}, {}> {
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
                            Test
                        </div>
                        <div key="profile__fullname" className="profile__fullname">
                            <span key="name" className="profile__name">
                                Test
                            </span>
                            <span key="surname" className="profile__surname">
                                Testov
                            </span>
                        </div>
                    </div>
                </div>
                <div key="stat" className="profile__statistics">
                    <div key="boards-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            132
                        </span>
                        <span key="profile__stat-name" className="profile__stat-name">
                            pins
                        </span>
                    </div>
                    <div key="pins-stat" className="profile__stat-container">
                        <span key="profile__stat-counter" className="profile__stat-counter">
                            2.3k
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
