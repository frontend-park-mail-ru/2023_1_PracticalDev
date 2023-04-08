import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
type SignupProps = {};
type SignupState = {};

const formInputs = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
    },
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your name',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
    },
    {
        name: 'password_repeat',
        type: 'password',
        placeholder: 'Repeat your password',
    },
];

const formProps = {
    id: 'loginForm',
    method: 'post',
    inputs: formInputs,
    submitBtnText: 'signup',
};

export class SignupScreen extends Component<SignupProps, SignupState> {
    componentDidMount(): void {}
    render() {
        return (
            <div key="signup-wrapper" className="wrapper">
                <div key="section_logo" className="section_logo">
                    <AuthLogoSection key="auth-logo" illustrationSrc="/static/img/search-animate.svg" />
                </div>

                <div key="section_login" className="section_login">
                    <h1 key="header__login" className="header__login">
                        Create an account
                    </h1>
                    <hr key="hr" style="width:70%;;border:1px solid #276678;" />
                    <div key="form_wrapper" className="form_wrapper">
                        <Form key="signup-form" {...formProps} />
                        <div key="form_help_section" className="form_help_section">
                            <a href="/login" id="register_link" key="register_link">
                                Already have an account?
                            </a>
                            <a href="/signup" id="password_recover_link" key="password_recover_link">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
