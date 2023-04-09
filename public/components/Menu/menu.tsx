import { Component, createElement } from '@t1d333/pickpinlib';

const menuItems = [
    { link: '/feed', name: 'home' },
    { link: '/profile', name: 'dashboard' },
    { link: '/board', name: 'settings' },
];

export default class Menu extends Component<{}, {}> {
    render() {
        return (
            <div key="menu" className="menu">
                <div key="menu__logo-container" className="menu__logo-container">
                    <img key="menu__logo" className="menu__logo" src="../../static/img/Logo2.svg" />
                </div>
                <div key="menu__box" className="menu__box">
                    {...menuItems.map((item) => {
                        return (
                            <span key={'menu__item-' + item.name} className="menu__item">
                                <a
                                    href={item.link}
                                    key={'symbol-' + item.name}
                                    className="material-symbols-outlined md-32 menu__link"
                                >
                                    {item.name}
                                </a>
                            </span>
                        );
                    })}
                </div>
                <button className="menu__loguout-btn material-symbols-outlined md-32" key="menu__loguout-btn">
                    logout
                </button>
                <a key="menu__logout-link" href="/login" id="menu__logout-link" style="display: none;"></a>
            </div>
        );
    }
}
