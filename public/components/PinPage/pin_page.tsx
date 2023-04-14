import { Component, createElement } from '@t1d333/pickpinlib';

import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { IBoard, IPin, IUser } from '../../models';
import { store } from '../../store/store';
import { Pin } from '../../models/pin';
import { navigate } from '../../actions/navigation';
import Board from '../../models/board';
import { loadAvailableBoards } from '../../actions/board';

type PinScreenState = {
    pin: IPin | undefined;
    availableBoards: IBoard[];
    author: IUser | undefined;
    response: string;
    isLiked: boolean;
};

type PinScreenProps = {};

export class PinScreen extends Component<PinScreenProps, PinScreenState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = {
            pin: store.getState().pinView,
            availableBoards: store.getState().availableBoards,
            author: undefined,
            response: '',
            isLiked: false,
        };
    }

    private onSaveCallback = () => {
        const select = document.querySelector('.pin-view__board-list') as HTMLSelectElement;
        if (select.value === '') {
            this.setState((s) => {
                return { ...s, response: 'Choose an existing board or create a new one' };
            });
            return;
        }

        Board.addPinToBoard(parseInt(select.value), this.state.pin?.id!).then((res) => {
            switch (res.status) {
                case 200:
                    this.setState((s) => {
                        return { ...s, response: 'Pin saved successfully!' };
                    });
                    break;

                case 409:
                    this.setState((s) => {
                        return { ...s, response: 'The pin has already been saved on this board' };
                    });
                    break;
                default:
                    this.setState((s) => {
                        return { ...s, response: 'Server error' };
                    });
            }
        });
    };

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

    private onLoadAvailableBoards = () => {
        if (store.getState().type !== 'loadedAvailableBoards') {
            return;
        }
        this.setState((s) => {
            return {
                ...s,
                availableBoards: store.getState().availableBoards,
            };
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onPinLoad.bind(this)));
        this.unsubs.push(store.subscribe(this.onLoadAvailableBoards.bind(this)));

        Board.getBoards().then((boards) => {
            loadAvailableBoards(boards);
        });

        const id = Number(location.href.split('/')[4]);
        Pin.getPin(id).then((pin) => {
            Pin.getPinAuhtor(pin).then((author) => {
                this.setState((s) => {
                    return {
                        ...s,
                        author: author,
                        pin: pin,
                        isLiked: pin.liked,
                    };
                });
            });
        });
    }

    private onLikePin = (e: MouseEvent) => {
        Pin.LikePin(this.state.pin?.id!).then((resp) => {
            if (resp.ok) {
                const pin = this.state.pin;
                pin!.n_likes += 1;
                this.setState((s: PinScreenState) => {
                    return {
                        ...s,
                        pin: pin,
                        isLiked: true,
                    };
                });
            }
        });
    };

    private onDislikePin = (e: MouseEvent) => {
        Pin.UnLikePin(this.state.pin?.id!).then((resp) => {
            if (resp.ok) {
                const pin = this.state.pin;
                pin!.n_likes -= 1;
                this.setState((s: PinScreenState) => {
                    return {
                        ...s,
                        pin: pin,
                        isLiked: false,
                    };
                });
            }
        });
    };

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
                                    <button
                                        key="like-btn"
                                        onclick={
                                            this.state.isLiked
                                                ? this.onDislikePin.bind(this)
                                                : this.onLikePin.bind(this)
                                        }
                                        className={
                                            'pin-view__actions-like-btn material-symbols-outlined md-32 ' +
                                            (this.state.isLiked ? 'active' : '')
                                        }
                                    >
                                        favorite
                                    </button>

                                    <p key="like-counter" className="pin-view__actions-stat">
                                        {String(this.state.pin ? this.state.pin.n_likes : '')}
                                    </p>

                                    <select key="available-boards" name="boardName" className="pin-view__board-list">
                                        {...this.state.availableBoards.map((board) => {
                                            return (
                                                <option key={board.id} value={board.id}>
                                                    {board.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <button
                                        key="save-btn"
                                        className="pin-view__actions-save-btn"
                                        onclick={this.onSaveCallback.bind(this)}
                                    >
                                        Save
                                    </button>
                                </div>
                                <p className="pin-view__response-container">{this.state.response}</p>
                                <p className="pin-view__title">
                                    {this.state.pin?.title ? this.state.pin?.title.slice(0, 20) : ''}
                                </p>
                                <p className="pin-view__description">
                                    {this.state.pin?.description ? this.state.pin?.description.slice(0, 40) : ''}
                                </p>
                                <div className="pin-view__author">
                                    <img
                                        className="pin-view__author-avatar-img"
                                        src={this.state.author?.profile_image ?? ''}
                                        alt="Pin author avatar"
                                    ></img>
                                    <p className="pin-view__author-name">{this.state.author?.username ?? ''}</p>
                                </div>
                                <p className="pin-view__comments-header"></p>
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
