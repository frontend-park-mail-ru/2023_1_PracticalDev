import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import AuthLogoSection from '../AuthLogoSection/authLogoSection';
import User from '../../models/user';
import { store } from '../../store/store';
import { validateEmail } from '../../util/validator';
import { validateUsername } from '../../util/validator';
import { validatePassword } from '../../util/validator';
import { loginUser } from '../../actions/user';
import { navigate } from '../../actions/navigation';
import { ChatWs } from '../../util/chatWs';

import '../../static/img/search-animate.svg'

type SignupProps = {};
type SignupState = {};

const convertErrMsg = (msg: string): string => {
    return msg === 'Empty string' ? 'All fields must be filled' : msg;
};

const debounce = (func: Function, timeout = 600) => {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
};

const formInputs = [
    {
        name: 'username',
        type: 'text',
        placeholder: 'Enter your username',
        icon: 'person',
        validator: debounce((e: any) => {
            try {
                validateUsername(e.target.value);
            } catch (err: any) {
                store.dispatch({
                    type: 'validationErrorMessage',
                    payload: {
                        message: convertErrMsg(err.message),
                    },
                });
                return;
            }

            store.dispatch({
                type: 'validationErrorMessage',
                payload: {
                    message: '',
                },
            });
        }),
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email',
        icon: 'alternate_email',
        validator: debounce((e: any) => {
            try {
                validateEmail(e.target.value);
            } catch (err: any) {
                store.dispatch({
                    type: 'validationErrorMessage',
                    payload: {
                        message: convertErrMsg(err.message),
                    },
                });
                return;
            }
            store.dispatch({
                type: 'validationErrorMessage',
                payload: {
                    message: '',
                },
            });
        }),
    },

    {
        name: 'password',
        type: 'password',
        placeholder: 'Enter your password',
        icon: 'lock',
        validator: debounce((e: any) => {
            try {
                validatePassword(e.target.value);
            } catch (err: any) {
                store.dispatch({
                    type: 'validationErrorMessage',
                    payload: {
                        message: convertErrMsg(err.message),
                    },
                });
                return;
            }
            store.dispatch({
                type: 'validationErrorMessage',
                payload: {
                    message: '',
                },
            });
        }),
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
            validateEmail(formData.email);
            validatePassword(formData.password);
        } catch (err: any) {
            store.dispatch({
                type: 'validationErrorMessage',
                payload: {
                    message: convertErrMsg(err.message),
                },
            });

            return;
        }

        User.signup(formData.username, formData.email.split('@')[0], formData.email, formData.password)
            .then((res) => {
                ChatWs.createSocket();
                loginUser(res);
            })
            .catch((res) => {
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
        User.getMe().then(() => {
            navigate('/feed');
        });
        this.unsubs.push(store.subscribe(this.signupHandler.bind(this)));
    }

    componentWillUnmount(): void {
        for (const unsub of this.unsubs) {
            unsub();
        }
    }
    render() {
        return (
            <div className="wrapper">
                <AuthLogoSection illustrationSrc="/static/img/search-animate.svg" />

                <div className="section_login">
                    <h1 className="header__login">Create an account</h1>

                    <hr style="width:85%;border:1px solid #276678;" />
                    <div className="form_wrapper">
                        <Form {...formProps} />
                        <div className="form_help_section">
                            <a href="/login" id="register_link">
                                Already have an account?
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
