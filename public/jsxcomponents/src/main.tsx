import { Component, VNode, createElement } from "@t1d333/pickpinlib";
import { Input } from "./input";
type MainScreenProps = {};
type MainScreenState = {
  selectedTab: "feed" | "profile" | "settings";
};

const menuItems = [
  { link: "/profile", name: "home" },
  { link: "/feed", name: "dashboard" },
  { link: "/settings", name: "settings" },
];

type InputProps = {};
type InputState = {};

type HeaderProps = {};
type HeaderState = {};

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div key="header" className="header">
        <div key="header__search-wrapper" className="header__search-wrapper">
          <Input key="search-input" type="search" name="search" icon="search" />
          <button
            key="header__pin-creation-btn"
            className="header__pin-creation-btn"
          >
            <span className="material-symbols-outlined md-40">add</span>
          </button>
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
          <img className="header__avatar" key="header__avatar" />
          <span key="header__username" className="header__username">
            username
          </span>
        </div>
      </div>
    );
  }
}

class Menu extends Component<{}, {}> {
  render() {
    return (
      <div key="menu" className="menu">
        <div key="menu__logo-container" id="menu__logo-container">
          <img key="menu__logo" id="menu__logo" src="/static/img/Logo2.svg" />
        </div>
        <div key="menu__box" className="menu__box">
          {...menuItems.map((item) => {
            return (
              <span key={"menu__item-" + item.name} className="menu__item">
                <a
                  href={item.link}
                  key={"symbol-" + item.name}
                  className="material-symbols-outlined md-32 menu__link"
                >
                  {item.name}
                </a>
              </span>
            );
          })}
        </div>
        <button
          className="material-symbols-outlined md-32"
          key="menu__loguout-btn"
          id="menu__loguout-btn"
        >
          logout
        </button>
        <a
          key="menu__logout-link"
          href="/login"
          id="menu__logout-link"
          style="display: none;"
        ></a>
      </div>
    );
  }
}

export class MainScreen extends Component<MainScreenProps, MainScreenState> {
  render() {
    return (
      <div key="wrapper">
        <Menu key="menu" />
        <Header key="header" />
        <div
          className=""
          id="app"
          style="left: 100px; width: calc(100% - 100px); top: 80px;"
        >
          <div className="main__content">
            <button id="cors-btn">Проверить CORS</button>
          </div>
        </div>
      </div>
    );
  }
}
