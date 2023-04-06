import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import MenuItem from './menuitem';

interface MenuProps {
    selectedTab: 'feed' | 'profile' | 'settings';
}
interface MenuState {}

const menuItems = [
    { link: '/profile', name: 'home' },
    { link: '/feed', name: 'dashboard' },
    { link: '/settings', name: 'settings' },
];

class Menu extends Component<MenuProps, MenuState> {
    render() {
        return (
            <div className="sidebar">
                <div id="sidebar_logo_container">
                    <img id="sidebar_logo" src="./static/img/Logo2.svg" />
                </div>
                <div className="menu__box">
                    {...menuItems.map((item) => {
                        return <MenuItem link={item.link} name={item.name} />;
                    })}
                </div>
                <button className="material-symbols-outlined md-32" id="logout_btn">
                    logout
                </button>
                <a href="/login" id="logout-link" style="display: none;"></a>
            </div>
        );
    }
}

export default Menu;
