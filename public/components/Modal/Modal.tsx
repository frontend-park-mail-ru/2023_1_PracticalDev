import { Component, VComponent, createElement, renderElement } from '@t1d333/pickpinlib';
import './Modal.css';
import { store } from '../../store/store';
import { tagToContent } from './tagToContent';

type ModalState = {
    isVisible: boolean;
    contentTag: string;
};

export class Modal extends Component<{}, ModalState> {
    private unsubs: Function[] = [];
    state = { isVisible: false, contentTag: '' };
    onShow() {
        if (store.getState().type !== 'showModal') {
            return;
        }

        const contentTag = store.getState().modalContentTag;
        this.setState((_) => {
            return { isVisible: true, contentTag: contentTag };
        });
    }

    onHide() {
        if (store.getState().type !== 'hideModal') {
            return;
        }

        this.setState((_) => {
            return { isVisible: false, contentTag: '' };
        });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onShow.bind(this)));
        this.unsubs.push(store.subscribe(this.onHide.bind(this)));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }

    render() {
        return (
            <div
                className={`modal ${this.state.isVisible ? 'active' : ''}`}
                onclick={() => {
                    this.setState((state) => {
                        return { isVisible: false };
                    });
                }}
            >
                <div
                    className="modal__content"
                    onclick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    {tagToContent(this.state.contentTag)}
                </div>
            </div>
        );
    }
}
