import { Component, createElement } from "@t1d333/pickpinlib";

type AuthLogoProps = {
  illustrationSrc: string;
};

type AuthLogoState = {};
export default class AuthLogoSection extends Component<AuthLogoProps, AuthLogoState> {
  render() {
    return (
      <div key="auth-logo-section" className="auth-logo-section">
        <div
          key="auth-logo-section__container"
          className="auth-logo-section__container"
        >
          <img
            key="auth-section__logo-img"
            className="auth__img-logo"
            src="/static/img/Logo2.svg"
          />
          <div
            key="auth-logo-section__text-container"
            className="auth-logo-section__text-container"
          >
            <h1
              key="auth-logo-section__name"
              className="auth-logo-section__name"
            >
              PickPin
            </h1>
            <h2
              key="auth-logo-section__text"
              className="auth-logo-section__text"
            >
              Pick pictures for your pins
            </h2>
          </div>
        </div>

        <img
          key="auth-logo-section__illustration"
          className="auth-logo-section__illustration"
          src={this.props.illustrationSrc}
        />
      </div>
    );
  }
}
