import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import Ajax from '../../util/ajax';
import User from '../../models/user';
import { logoutUser } from '../../actions/user';
import { navigate } from '../../actions/navigation';

import './menu.css';

const menuItems = [
    { link: '/feed', name: 'home' },
    { link: '/chats', name: 'chat' },
    { link: '/profile', name: 'dashboard' },
    { link: '/settings', name: 'settings' },
];

export default class Menu extends Component<{}, {}> {
    private logoutCallback() {
        User.logout().then(() => {
            logoutUser();
        });
    }

    render() {
        return (
            <div className="menu">
                <div className="menu__logo-container">
                    <img className="menu__logo" src="/static/img/Logo2.svg" onclick={navigate.bind(this, '/feed')} />
                </div>
                <div className="menu__box">
                    {...menuItems.map((item) => {
                        return (
                            <span className="menu__item">
                                <a href={item.link} className={'material-symbols-outlined md-32 menu__link'}>
                                    {item.name}
                                </a>
                            </span>
                        );
                    })}
                </div>
                <button className="menu__loguout-btn material-symbols-outlined md-32" onclick={this.logoutCallback}>
                    logout
                </button>
                <a href="/login" id="menu__logout-link" style="display: none;"></a>
            </div>
        );
    }
}
