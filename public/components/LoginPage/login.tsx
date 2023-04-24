import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
import { store } from '../../store/store';
import { validateEmail, validatePassword } from '../../util/validator';
import Ajax from '../../util/ajax';
import CheckAuth from '../../util/check';
import { IBoard, IPin, IUser } from '../../models';
import User from '../../models/user';
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
//
//
// const loginUser = (email: string, password: string) => {
//     Ajax.post('/api/auth/login', {
//         email: email,
//         password: password,
//     }).then((response) => {
//         if (!response.ok) {
//             if (response.status === 404) {
//                 store.dispatch({
//                     type: 'validationErrorMessage',
//                     payload: {
//                         message: 'Wrong email or password',
//                     },
//                 });
//             }
//         } else {
//             const user: IUser = response.body as IUser;
//             store.dispatch({
//                 type: 'navigate',
//                 payload: {
//                     page: '/feed',
//                     user: user,
//                 },
//             });
//         }
//     });
// };

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

        //TODO: добавить проверку на пустые строки

        User.login(formData.email, formData.password)
            .then((res) => {
                store.dispatch({
                    type: 'navigate',
                    payload: {
                        page: '/feed',
                        user: res,
                    },
                });
            })
            .catch((err) => {
                store.dispatch({
                    type: 'validationErrorMessage',
                    payload: {
                        message: 'Wrong email or password',
                    },
                });
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
