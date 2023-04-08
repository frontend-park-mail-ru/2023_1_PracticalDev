import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { Input } from '../../components/Input/input';

interface HeaderProps {
    selectedTab: 'feed' | 'profile' | 'settings';
}
interface HeaderState {}

class Header extends Component<HeaderProps, HeaderState> {
    render() {
        return (
            <div id="header">
                <div id="header_search_wrapper">
                    <Input placeholder="Search" name="search" type="text" />
                    <button id="pin_creation_btn">
                        <span className="material-symbols-outlined md-40">add</span>
                    </button>
                </div>
                <div id="user_block">
                    <button className="header_btn">
                        <span className="material-symbols-outlined md-32">notifications</span>
                    </button>
                    <button className="header_btn">
                        <span className="material-symbols-outlined md-32">chat</span>
                    </button>
                    <img id="header_avatar" />
                    <span id="header_username">{'Kirill pomidor'}</span>
                </div>
            </div>
        );
    }
}

export default Header;
