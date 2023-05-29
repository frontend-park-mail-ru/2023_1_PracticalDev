import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import { store } from '../../store/store';
import { Pin as PinModel } from '../../models/pin';
import { IBoard, IPin } from '../../models';
import Board from '../../models/board';
import Feed from '../Feed/feed';

import './pin.css';
import { loadPinView, loadPins, safeFeedPos } from '../../actions/feed';
import { showModal } from '../../actions/modal';

interface PinState {
    isLiked: boolean;
    selectedBoardId: number;
    saveState: 'notSaved' | 'saved' | 'alreadySaved' | 'serverError';
}

interface PinProps {
    pin: IPin;
    page: string;
    availableBoards: IBoard[];
}

export class Pin extends Component<PinProps, PinState> {
    private unsubs: Function[] = [];
    private sizes = ['card_small', 'card_medium', 'card_large'];
    private cardSize: string;
    constructor() {
        super();
        this.state = {
            isLiked: false,
            saveState: 'notSaved',
            selectedBoardId: store.getState().availableBoards.length > 0 ? store.getState().availableBoards[0].id : -1,
        };
        this.cardSize = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    }

    private onUserLoad = () => {
        if (store.getState().type !== 'updateLikeState') return;
        const pin = store.getState().pins.find((pin) => {
            return pin.id === this.props.pin.id;
        });

        if (pin?.liked === this.state.isLiked) return;

        this.setState((state) => {
            return {
                ...state,
                isLiked: !state.isLiked,
            };
        });
    };

    private onClick = (event: any) => {
        if (store.getState().page === '/feed') {
            safeFeedPos(window.scrollY);
        }

        loadPinView(this.props.pin);
        navigate(`/pin/${this.props.pin.id}`);
        event.stopPropagation();
    };

    private resolveSecondaryBtn = () => {
        const curPage = store.getState().page.split('/')[1];
        switch (curPage) {
            case 'profile': {
                return (
                    <button
                        key="change_btn"
                        onclick={this.onChangePin.bind(this)}
                        className="pin__icon-btn material-symbols-outlined md-24"
                    >
                        edit
                    </button>
                );
            }
            case 'board-changing': {
                return (
                    <button
                        onclick={this.onDeletePin.bind(this)}
                        className="pin__icon-btn material-symbols-outlined md-24"
                    >
                        delete
                    </button>
                );
            }
            default:
                return (
                    <button
                        onclick={(event: any) => {
                            event.stopPropagation();
                            if (!store.getState().user) {
                                showModal('login');
                                return;
                            }

                            if (this.state.isLiked) {
                                this.onDislikePin();
                            } else {
                                this.onLikePin();
                            }
                        }}
                        className={
                            'pin__icon-btn material-symbols-outlined md-24 ' + (this.state.isLiked ? 'active' : '')
                        }
                    >
                        favorite
                    </button>
                );
        }
    };

    private onLikePin = () => {
        PinModel.LikePin(this.props.pin.id).then((resp) => {
            if (resp.ok) {
                this.setState((state) => {
                    return {
                        ...state,
                        isLiked: true,
                    };
                });
            }
        });
    };

    private onDislikePin = () => {
        PinModel.UnLikePin(this.props.pin.id).then((resp) => {
            if (resp.ok) {
                this.setState((state) => {
                    return {
                        ...state,
                        isLiked: false,
                    };
                });
            }
        });
    };

    private onChangePin = (event: MouseEvent) => {
        store.dispatch({ type: 'pinChanging', payload: { changingPin: this.props.pin } });
        navigate(`/pin-changing/${this.props.pin.id}`);
        event.stopPropagation();
    };

    private onDeletePin = (event: MouseEvent) => {
        Board.deletePinFromBoard(store.getState().boardId, this.props.pin.id).then(() => {
            const pins = store.getState().pins.filter((pin) => {
                return pin.id !== this.props.pin.id;
            });

            loadPins(pins);
        });
        event.stopPropagation();
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

    private onSavePin = (event: any) => {
        event.stopPropagation();
        if (!store.getState().user) {
            showModal('login');
            return;
        }

        if (this.state.saveState === 'saved') return;

        Board.addPinToBoard(this.state.selectedBoardId, this.props.pin.id).then((res) => {
            switch (res.status) {
                case 204:
                    this.setState((state) => {
                        return { ...state, saveState: 'saved' };
                    });
                    break;
                case 409:
                    this.setState((state) => {
                        return { ...state, saveState: 'saved' };
                    });
                    break;

                default:
                    this.setState((state) => {
                        return { ...state, saveState: 'serverError' };
                    });
                    break;
            }
        });

        setTimeout(() => {
            this.setState((state) => {
                return { ...state, saveState: 'notSaved' };
            });
        }, 5000);
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onPinLoad));
        this.unsubs.push(store.subscribe(this.onUserLoad));
        this.setState((state) => {
            return {
                ...state,
                isLiked: this.props.pin.liked,
            };
        });
    }

    private CopyLink = (e: MouseEvent) => {
        PinModel.getShareLink(this.props.pin.id).then((resp) => {
            navigator.clipboard.writeText(resp);
            var feed = new Feed();
            feed.openPopup();
            setTimeout(feed.closePopup, 5000);
        });

        e.stopPropagation();
    };

    render() {
        return (
            <div
                className={'card ' + this.cardSize}
                onclick={this.onClick.bind(this)}
                style={'background-color:' + this.props.pin.media_source_color + ';'}
            >
                <div className="pin__title">{this.props.pin.title}</div>

                <div className="pin__modal">
                    <div className="pin__modal-head">
                        <select
                            name="boardName"
                            className="pin-view__board-list"
                            onchange={(event: any) => {
                                this.setState((state) => {
                                    return {
                                        ...state,
                                        selectedBoardId: event.target.value,
                                        saveState: 'notSaved',
                                    };
                                });
                            }}
                            onclick={(event: any) => {
                                event.stopPropagation();
                            }}
                        >
                            {...this.props.availableBoards.map((board) => {
                                return <option value={board.id}>{board.name}</option>;
                            })}
                        </select>
                        <button
                            className={`pin-view__actions-save-btn ${this.state.saveState === 'saved' ? 'active' : ''}`}
                            onclick={this.onSavePin}
                        >
                            {this.state.saveState === 'saved' ? (
                                <span className="save-btn__content">
                                    Saved
                                    <span className="material-symbols-outlined md-24">check_circle</span>
                                </span>
                            ) : (
                                <span
                                    className="save-btn__content"
                                    style={this.state.saveState === 'serverError' ? 'color: red;' : ''}
                                >
                                    Save
                                    {this.state.saveState === 'notSaved' ? (
                                        ''
                                    ) : (
                                        <span className="material-symbols-outlined md-24">error</span>
                                    )}
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="pin__modal-foot">
                        <button
                            className="pin__icon-btn material-symbols-outlined md-24"
                            href="/pin-changing"
                            onclick={this.CopyLink.bind(this)}
                        >
                            share
                        </button>
                        <img src={this.props.pin.author.profile_image} className="pin__author-avatar" />
                        {this.resolveSecondaryBtn()}
                    </div>
                </div>
                <img className="pin__image" src={this.props.pin.media_source} srcset="" />
            </div>
        );
    }
}
