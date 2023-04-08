import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import { Input } from '../Input/input';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
type AuthProps = {};
type AuthState = {};

const loginInputs = [
    {
        name: 'email',
        type: 'email',
        placeholder: 'email',
        icon: 'alternate_email',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Input your password',
        icon: 'lock',
    },
];

const formProps = {
    id: 'loginForm',
    method: 'post',
    inputs: loginInputs,
    submitBtnText: 'login',
};

export class LoginScreen extends Component<AuthProps, AuthState> {
    render() {
        return (
            <div key="login-wrapper" className="wrapper">
                <AuthLogoSection key="logo-section" illustrationSrc="/static/img/animate.svg" />

                <div key="section_login" className="section_login">
                    <h1 key="header__login" className="header__login">
                        Welcome back
                    </h1>
                    <hr key="hr" style="width:70%;;border:1px solid #276678;" />
                    <div key="form_wrapper" className="form_wrapper">
                        <Form key="form" {...formProps} />
                        <div key="form_help_section" className="form_help_section">
                            <a href="/signup" key="register_link" id="register_link">
                                Don't have an account?
                            </a>
                            <a href="/signup" key="password_recover_link" id="password_recover_link">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
