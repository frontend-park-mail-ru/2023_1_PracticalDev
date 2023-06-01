import { createElement, Component, VNode } from '@t1d333/pickpinlib';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { ResponsePopup } from '../ResponsePopup/ResponsePopup';

type MainProps = {
    children: VNode[];
};
type MainState = {};

export class Main extends Component<MainProps, MainState> {
    render(): VNode {
        return (
            <div>
                <Menu />
                <Header />
                <div id="app">
                    <ResponsePopup />
                    <div className="main__content">{...this.props.children}</div>
                </div>
            </div>
        );
    }
}
