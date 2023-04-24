import { Component, createElement } from '@t1d333/pickpinlib';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IPin } from '../../models';
import Feed from '../Feed/feed';
import { store } from '../../store/store';
import Ajax from '../../util/ajax';

type SettingsScreenProps = {
    name: string;
};
type SettingsScreenState = {
    pins: IPin[];
};


export class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
    }


    componentDidMount(): void {
        this.unsubs.push();
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header
                    key="header"
                    username="username"
                    avatarSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                />
                <div key="app" id="app">
                    
                </div>
            </div>
        );
    }
}
