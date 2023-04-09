import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { ProfileTab } from '../ProfileTab/profile-tab';
import { ProfileHeader } from '../ProfileHeader/profile-header';

export class ProfileScreen extends Component<{}, {}> {
    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header
                    key="header"
                    username="username"
                    avatarSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                />
                <div key="app" id="app" style="left: 100px; width: calc(100% - 100px); top: 80px;">
                    <div key="main__content" className="main__content">
                        <div className="profile__container">
                            <ProfileHeader key="profile-header" />
                            <ProfileTab key="profile-tab" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
