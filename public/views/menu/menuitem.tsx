import { Component, createElement, renderElement } from '@t1d333/pickpinlib';

interface MenuItemProps {
    name: 'feed' | 'profile' | 'settings';
    link: string;
}

interface MenuItemState {}

class MenuItem extends Component<MenuItemProps, MenuItemState> {
    render() {
        return (
            <span className="menu__item">
                <a href={'"' + this.props.link + '"'} className="material-symbols-outlined md-32 menu__link">
                    {this.props.name}
                </a>
            </span>
        );
    }
}

export default MenuItem;
