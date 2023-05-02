import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from "../Menu/menu"
import { Header } from "../Header/header"
import photo from './photo.jpg'
import { navigate } from '../../actions/navigation';


type ChatListProps = {};
type ChatListState = {};
export class ChatList extends Component<ChatListProps, ChatListState> {
    render(){
        return(
            <div clasName="wrapper">
                <Menu key="menu" />
                <Header key="header" />
                <div key="app" id="app">
                    <div key="chatList__main__content" className="chatList__main__content">
                        <div className="chatList__header">
                            <h1 className="chatList__header__text">Messages</h1>
                        </div>
                        <div className="chatList__companion" onclick={navigate.bind(this, '/chatPage')}>
                                <img className ="chatList__companion__avatar" src={photo} alt="" />
                                <div className="chatList__companion__last_message">
                                    <div className="chatList__companion__last_message__text">
                                        something
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}