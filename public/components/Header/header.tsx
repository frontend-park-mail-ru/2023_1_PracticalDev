import { Component, createElement } from "@t1d333/pickpinlib";
import { Input } from "../Input/input";

type HeaderProps = {
  username: string;
  avatarSrc: string;
};

type HeaderState = {};

export class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div key="header" className="header">
        <div key="header__search-wrapper" className="header__search-wrapper">
          <Input key="search-input" type="search" name="search" icon="search" />
        </div>
        <div key="header__user-block" className="header__user-block">
          <button key="header__notify-btn" className="header__btn">
            <span
              key="notfy-symbol"
              className="material-symbols-outlined md-32"
            >
              notifications
            </span>
          </button>
          <button key="header__chat-btn" className="header__btn">
            <span key="chat-symbol" className="material-symbols-outlined md-32">
              chat
            </span>
          </button>
          <img
            className="header__avatar"
            key="header__avatar"
            src={this.props.avatarSrc}
          />
          <span key="header__username" className="header__username">
            {this.props.username}
          </span>
        </div>
      </div>
    );
  }
}
