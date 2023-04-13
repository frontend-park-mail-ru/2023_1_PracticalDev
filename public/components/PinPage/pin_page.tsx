import { Component, createElement } from '@t1d333/pickpinlib';

import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IPin, IUser } from '../../models';
import { store } from '../../store/store';
import { Pin } from '../../models/pin';
import { navigate } from '../../actions/navigation';

type PinScreenState = {
    pin: IPin | undefined;
    author: IUser | undefined;
};

type PinScreenProps = {};

export class PinScreen extends Component<PinScreenProps, PinScreenState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = { pin: store.getState().pinView, author: undefined };
    }

    private getPin = () => {};
    private onPinLoad = () => {
        if (store.getState().type !== 'loadedPinInfo') {
            return;
        }
        this.setState((s) => {
            return {
                ...s,
                author: store.getState().author,
            };
        });
    };
    componentDidMount(): void {
        if (!this.state.pin) {
            const id = Number(location.href.split('/')[4]);
            Pin.getPin(id).then((resp) => {
                Pin.getPinAuhtor((resp.body as IPin)).then((author) => {
                    this.setState((s) => {
                        return {
                            author: author,
                            pin: resp.body as IPin,
                        };
                    });
                });
                
            });
            return;
        }
        this.unsubs.push(store.subscribe(this.onPinLoad.bind(this)));
        Pin.getPinAuhtor(this.state.pin!).then((author) => {
            store.dispatch({ type: 'loadedPinInfo', payload: { author: author } });
        });
    }

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header key="header" />
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <div className="pin-view">
                            <img className="pin-view__image" src={this.state.pin?.media_source!} alt="Pin image"></img>
                            <div className="pin-view__info">
                                <div className="pin-view__actions">
                                    <button className="pin-view__actions-more-btn material-symbols-outlined md-32">
                                        more_horiz
                                    </button>
                                    <button className="pin-view__actions-share-btn material-symbols-outlined md-32">
                                        share
                                    </button>
                                    <button className="pin-view__actions-like-btn material-symbols-outlined md-32">
                                        favorite
                                    </button>
                                    <p className="pin-view__actions-stat">{'0'}</p>
                                    <button className="pin-view__actions-save-btn">Save</button>
                                </div>
                                <p className="pin-view__title">
                                    {this.state.pin?.title ? this.state.pin?.title.slice(0, 20) : ''}
                                </p>
                                <p className="pin-view__description">
                                    {this.state.pin?.description ? this.state.pin?.description.slice(0, 40) : ''}
                                </p>
                                <div className="pin-view__author">
                                    <div className="pin-view__author-avatar">
                                        <img
                                            className="pin-view__author-avatar-img"
                                            src={this.state.author?.profile_image ?? ''}
                                            alt="Pin author avatar"
                                        ></img>
                                    </div>
                                    <p className="pin-view__author-name">{this.state.author?.username ?? ''}</p>
                                    <button className="pin-view__author-subscribe-btn">Subscribe</button>
                                </div>
                                <p className="pin-view__comments-header">Comments</p>
                                <div className="pin-view__comments"></div>
                                <div className="pin-view__add-comment">
                                    <div className="pin-view__add-comment-avatar"></div>
                                    <div className="pin-view__add-comment-input"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
