import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from "../Menu/menu"
import { Header } from "../Header/header"
import photo from './photo.jpg'
import { navigate } from '../../actions/navigation';


type ChatPageProps = {};
type ChatPageState = {};
export class ChatPage extends Component<ChatPageProps, ChatPageState> {
    render(){
        return(
            <div clasName="wrapper">
                <Menu key="menu" />
                <Header key="header" />
                <div key="app" id="app">
                    <div key="chatPage__main__content" className="chatPage__main__content">
                        <div className="chatPage__container">
                            <div className="chatPage__container__header">
                                <img className ="chatPage__container__header__avatar" src={photo} alt="" />
                                <div className="chatPage__container__header__text">someone</div>
                            </div>
                            <div className="chatPage__container__messages">
                                <div className="chatPage__container__messages__my_message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus repudiandae dolorum autem explicabo corporis, cum necessitatibus suscipit impedit debitis, soluta eum ipsam doloribus, distinctio sapiente omnis eius adipisci rerum minima.</div>
                                <div className="chatPage__container__messages__other_message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet accusamus ipsam voluptatem! Illo magnam recusandae modi! Maiores quis illo, nostrum corporis molestiae veritatis dolorum voluptas maxime placeat obcaecati amet qui!</div>
                            </div>
                            <div className="chatPage__container__input">
                                <input className="chatPage__container__input__text" placeholder="Write your message"  key="message" required/>
                                <button className="chatPage__container__input__btn material-symbols-outlined md-24">
                                    send
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}