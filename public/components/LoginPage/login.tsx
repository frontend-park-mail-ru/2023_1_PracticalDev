import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
import { store } from '../../store/store';
import CheckAuth from '../../util/check';
import User from '../../models/user';
import { validationError } from '../../actions/error';
import { loginUser } from '../../actions/user';
import './login.css';
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
    private prevData: any;
    private unsubs: (() => void)[] = [];

    private SubmitCallback() {
        if (store.getState().type !== 'loginFormSubmit') {
            return;
        }

        const formData = store.getState().formData;

        if (formData === this.prevData) {
            return;
        }
        this.prevData = formData;

        if (!formData && Object.keys(formData).length === 0) {
            return;
        }

        if (formData.name === '' || formData.password === '') {
            validationError('All fields must be filled!');
            return;
        }

        User.login(formData.email, formData.password)
            .then((res) => {
                loginUser(res);
            })
            .catch((res) => {
                if (res.status === 404) {
                    validationError('Wrong email or password');
                    return;
                }
                validationError('Server error');
            });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.SubmitCallback.bind(this)));
        CheckAuth();
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        return (
            <div className="wrapper">
                <AuthLogoSection illustrationSrc="/static/img/animate.svg" />

                <div className="section_login">
                    <h1 className="header__login">Welcome back</h1>
                    <hr style="width:85%;border:1px solid #276678;" />
                    <div className="form_wrapper">
                        <Form {...formProps} />
                        <div className="form_help_section">
                            <a href="/signup" id="register_link">
                                Don't have an account?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
