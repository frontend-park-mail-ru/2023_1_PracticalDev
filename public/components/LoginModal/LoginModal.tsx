import { Component, createElement } from '@t1d333/pickpinlib';
import { Form } from '../Form/form';
import { loginFormProps } from '../LoginPage/login';
import { store } from '../../store/store';
import { validationError } from '../../actions/error';
import User from '../../models/user';
import { ChatWs } from '../../util/chatWs';
import { Notification } from '../../models/notification';
import { loadUser } from '../../actions/user';
import { loadNotifications } from '../../actions/notification';
import { hideModal } from '../../actions/modal';
import './LoginModal.css';
import Board from '../../models/board';
import { loadAvailableBoards } from '../../actions/board';
import { navigate } from '../../actions/navigation';

export class LoginModal extends Component<{}, {}> {
    private unsubs: Function[] = [];
    private prevData: any;

    private onLogin = () => {
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

        if (formData.email === '' || formData.password === '') {
            validationError('All fields must be filled!');
            return;
        }

        User.login(formData.email, formData.password)
            .then((user) => {
                ChatWs.createSocket();
                Notification.createSocket();
                Notification.getNotifications().then((notifications) => {
                    Board.getBoards().then((boards) => {
                        loadAvailableBoards(boards);
                        loadNotifications(notifications);
                        loadUser(user);
                        hideModal();
                    });
                });
            })
            .catch((res) => {
                if (res.status === 404 || res.status === 400) {
                    validationError('Wrong email or password');
                    return;
                }
                validationError('Server error');
            });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onLogin));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }
    render() {
        return (
            <div className="form_wrapper">
                <h1 className="login-modal__header">Sign in to complete this action</h1>
                <Form {...loginFormProps} />
                <div className="form_help_section">
                    <a
                        id="register_link"
                        onclick={(event: any) => {
                            event.preventDefault();
                            hideModal();
                            navigate('/signup');
                        }}
                    >
                        Don't have an account?
                    </a>
                </div>
            </div>
        );
    }
}
