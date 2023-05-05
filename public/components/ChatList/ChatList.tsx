import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import User from '../../models/user';
import { IUser } from '../../models';
import { store } from '../../store/store';
import { Main } from '../Main/main';
import './ChatList.css';

type ChatListProps = {};
type ChatListState = { users: IUser[] };
export class ChatList extends Component<ChatListProps, ChatListState> {
    private unsubs: Function[] = [];

    constructor() {
        super();
        this.state = { users: [] };
    }

    private onNewChat() {
        if (store.getState().type !== 'newChat') {
            return;
        }

        const userId = store.getState().user?.id;
        const chat = store.getState().chat!;
        User.getUser(chat?.user1_id === userId ? chat?.user2_id : chat?.user1_id).then((user) => {
            this.setState((s) => {
                return {
                    users: [user, ...s.users],
                };
            });
        });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onNewChat.bind(this)));
        const userId = store.getState().user?.id;
        User.getChats(userId!).then((res) => {
            this.setState((s) => {
                return { ...s, users: res };
            });
        });
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    render() {
        return (
            <Main>
                <div className="chat-list__content">
                    <div className="chat-list__header">
                        <h1 className="chat-list__header-text">Chats</h1>
                    </div>
                    <div className="chat-list__container">
                        {...this.state.users.map((user) => {
                            return (
                                <div className="chat-list__companion" onclick={navigate.bind(this, `/chat/${user.id}`)}>
                                    <img className="chat-list__companion-avatar" src={user.profile_image} alt="" />
                                    <div className="chat-list__companion-name">{user.username}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Main>
        );
    }
}
