import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
import User from '../../models/user';
import { store } from '../../store/store';
import { validateEmail } from '../../util/validator';
import { validateUsername } from '../../util/validator';
import { validatePassword } from '../../util/validator';
import { loginUser } from '../../actions/user';
type SignupProps = {};
type SignupState = {};

const formInputs = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
        icon: 'person',
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        icon: 'alternate_email',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        icon: 'lock',
    },
];

const formProps = {
    id: 'loginForm',
    method: 'post',
    inputs: formInputs,
    submitBtnText: 'signup',
};

export class SignupScreen extends Component<SignupProps, SignupState> {
    private unsubs: Function[] = [];
    private signupHandler = () => {
        if (store.getState().type !== 'loginFormSubmit') {
            return;
        }
        const formData = store.getState().formData;

        try {
            //TODO: поправить empty string в валидации
            validateUsername(formData.username);
            validateEmail(formData.email);
            //TODO: добавить чекбокс для просмотра пароля
            validatePassword(formData.password);
        } catch (err: any) {
            store.dispatch({
                type: 'validationErrorMessage',
                payload: {
                    message: err.message,
                },
            });
            return;
        }

        User.signup(formData.username, formData.email.split('@')[0], formData.email, formData.password)
            .then((res) => {
                console.log(res);
                loginUser(res);
            })
            .catch((res) => {
                console.log(res);
                let errMsg = '';
                if (res.status === 400) {
                    errMsg = 'Such user already exists';
                } else {
                    errMsg = 'Server error';
                }
                store.dispatch({
                    type: 'validationErrorMessage',
                    payload: {
                        message: errMsg,
                    },
                });
            });
    };
    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.signupHandler.bind(this)));
    }

    componentWillUnmount(): void {
        for (const unsub of this.unsubs) {
            unsub();
        }
    }
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
