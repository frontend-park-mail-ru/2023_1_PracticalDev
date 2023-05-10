import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IUser, IMessage } from '../../models';
import User from '../../models/user';
import { Main } from '../Main/main';

import './ChatPage.css';

type ChatPageProps = {};
type ChatPageState = { user: IUser | undefined; messages: IMessage[] };
export class ChatPage extends Component<ChatPageProps, ChatPageState> {
    constructor() {
        super();
        this.state = { user: undefined, messages: [] };
    }

    private unsubs: Function[] = [];
    private id = Number(location.href.split('/')[4]);
    private onSendMsg = () => {
        const input = document.querySelector('.chat__message-input') as HTMLInputElement;
        const msgText = input.value;
        if (!msgText) {
            return;
        }
        const socket = store.getState().wsConnection;
        socket?.send(JSON.stringify({ text: msgText, receiver_id: this.id }));
        input.value = '';
    };

    private onNewMsg = () => {
        if (store.getState().type !== 'newMessage') {
            return;
        }

        const msg = store.getState().message;
        if (msg?.author_id !== this.id && msg?.author_id !== store.getState().user?.id) {
            return;
        }

        this.setState((s) => {
            return { ...s, messages: [...s.messages, msg!] };
        });
    };

    componentDidMount(): void {
        User.getChatMsg(this.id)
            .then((messages) => {
                this.setState((s) => {
                    return { ...s, messages: messages };
                });
                return User.getUser(this.id);
            })
            .then((user) => {
                this.setState((s) => {
                    return {
                        ...s,
                        user: user,
                    };
                });
            })
            .catch((res) => {
                if (res.status === 404) {
                    User.getUser(this.id).then((user) => {
                        this.setState((s) => {
                            return { ...s, user: user };
                        });
                    });
                }
            });
        this.unsubs.push(store.subscribe(this.onNewMsg.bind(this)));
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    render() {
        return (
            <Main>
                <div className="chat__content">
                    <div className="chat__container">
                        <div className="chat__header">
                            <img
                                className="chatPage__container__header__avatar"
                                src={
                                    this.state.user
                                        ? this.state.user.profile_image
                                        : 'https://pickpin.hb.bizmrg.com/default-user-icon-8-4024862977'
                                }
                                alt=""
                            />
                            <div className="chatPage__container__header__text">
                                {this.state.user ? this.state.user.username : ''}
                            </div>
                        </div>
                        <div className="chat__messages">
                            {...this.state.messages.map((msg) => {
                                return (
                                    <div
                                        className={`chatPage__container__messages__${
                                            msg.author_id === store.getState().user?.id ? 'my' : 'other'
                                        }_message`}
                                    >
                                        <div className={'message__text'}>{msg.text}</div>
                                    </div>
                                );
                            })}
                        </div>

                        <form className="chat__message-form" onsubmit={this.onSendMsg.bind(this)}>
                            <div className="chat__input-container">
                                <input
                                    className="chat__message-input"
                                    placeholder="Write your message"
                                    key="message"
                                    required
                                />
                                <button className="chat__submit-btn material-symbols-outlined md-32">send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Main>
        );
    }
}
