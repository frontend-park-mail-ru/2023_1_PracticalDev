import { Component, createElement } from '@t1d333/pickpinlib';

import './authLogoSectiom.css';

type AuthLogoProps = {
    illustrationSrc: string;
};

type AuthLogoState = {};
export default class AuthLogoSection extends Component<AuthLogoProps, AuthLogoState> {
    render() {
        return (
            <div className="auth-logo-section">
                <div className="auth-logo-section__container">
                    <img className="auth__img-logo" src="/static/img/Logo2.svg" />
                    <div className="auth-logo-section__text-container">
                        <h1 className="auth-logo-section__name">PickPin</h1>
                        <h2 className="auth-logo-section__text">Pick pictures for your pins</h2>
                    </div>
                </div>

                <img className="auth-logo-section__illustration" src={this.props.illustrationSrc} />
            </div>
        );
    }
}
