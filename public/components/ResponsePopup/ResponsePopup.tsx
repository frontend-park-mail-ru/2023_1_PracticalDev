import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import './ResponsePopup.css';
import { BoardCreationPopup } from '../BoardCreationPopup/BoardCreationPopup';
import { PinSavePopup } from '../PinSavePopup/PinSavePopup';
type ResponsePopupProps = {};
type ResponsePopupState = { visible: boolean; content: VNode };

const resolvePopupTag = (tag: string) => {
    switch (tag) {
        case 'newBoard':
            return <BoardCreationPopup />;
        case 'pinSaving':
            return <PinSavePopup />;
        default:
            return <div> </div>;
    }
};

export class ResponsePopup extends Component<ResponsePopupProps, ResponsePopupState> {
    protected state: ResponsePopupState = {
        visible: false,
        content: <div> </div>,
    };
    unsubs: Function[] = [];

    onShow = () => {
        if (store.getState().type !== 'showResponsePopup') return;
        this.setState(() => {
            return { visible: true, content: resolvePopupTag(store.getState().popupTag) };
        });

        setTimeout(() => {
            this.setState(() => {
                return { content: <div />, visible: false };
            });
        }, 3500);
    };

    onHide = () => {
        if (store.getState().type !== 'hideResponsePopup') return;
        this.setState(() => {
            return { content: <div />, visible: false };
        });
    };

    componentDidMount() {
        this.unsubs.push(store.subscribe(this.onShow));
        this.unsubs.push(store.subscribe(this.onHide));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }

    render() {
        return <div className={`response-popup ${this.state.visible ? 'active' : ''}`}>{this.state.content}</div>;
    }
}
