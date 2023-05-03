import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { navigate } from '../../actions/navigation';
import User from '../../models/user';
import { IUser } from '../../models';
import { store } from '../../store/store';

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

    render() {
        return (
            <div clasName="wrapper">
                <Menu />
                <Header />
                <div id="app">
                    <div className="chatList__main__content">
                        <div className="chatList__header">
                            <h1 className="chatList__header__text">Chats</h1>
                        </div>
                        {...this.state.users.map((user) => {
                            return (
                                <div className="chatList__companion" onclick={navigate.bind(this, `/chat/${user.id}`)}>
                                    <img className="chatList__companion__avatar" src={user.profile_image} alt="" />
                                    <div className="chatList__companion__last_message">
                                        <div className="chatList__companion__last_message__text">{user.username}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
