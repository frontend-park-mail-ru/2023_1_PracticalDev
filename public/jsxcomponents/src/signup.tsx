import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from './form';
import AuthLogoSection from './auth_section';
type SignupProps = {};
type SignupState = {};
const loginInputs = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
    },
    {
        name: 'name',
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
    inputs: loginInputs,
    submitBtnText: 'signup',
};

export class SignupScreen extends Component<SignupProps, SignupState> {
    componentDidMount(): void {}
    render() {
        return (
            <div className="wrapper">
                <div className="section_logo">
                    <AuthLogoSection illustrationSrc="/static/img/search-animate.svg" />
                </div>

                <div className="section_login">
                    <h1 className="header__login">Create an account</h1>
                    <hr style="width:70%;;border:1px solid #276678;" />
                    <div className="form_wrapper">
                        <Form {...formProps} />
                        <div className="form_help_section">
                            <a href="/login" id="register_link">
                                Already have an account?
                            </a>
                            <a href="/signup" id="password_recover_link">
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const abc = <SignupScreen />;
