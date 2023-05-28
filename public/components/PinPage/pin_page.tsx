import { Component, createElement } from '@t1d333/pickpinlib';

import { IBoard, IPin } from '../../models';
import { store } from '../../store/store';
import { Pin } from '../../models/pin';
import Board from '../../models/board';
import User from '../../models/user';
import { Main } from '../Main/main';

import './pin_page.css';
import { CommentList } from '../CommentList/CommentList';
import { Loader } from '../Loader/Loader';
import { showModal } from '../../actions/modal';

type PinScreenState = {
    pin: IPin | undefined;
    availableBoards: IBoard[];
    response: string;
    isLiked: boolean;
    isFollow: boolean;
    pinInfoLoad: boolean;
    commentsLoad: boolean;
};

type PinScreenProps = {};

export class PinScreen extends Component<PinScreenProps, PinScreenState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = {
            pin: store.getState().pinView,
            availableBoards: store.getState().availableBoards,
            response: '',
            isLiked: false,
            isFollow: false,
            pinInfoLoad: false,
            commentsLoad: false,
        };
    }

    private CopyLink = () => {
        if (this.state.pin == undefined) {
            return;
        }
        Pin.getShareLink(this.state.pin.id).then((resp) => {
            navigator.clipboard.writeText(resp);
            this.openPopup();
            setTimeout(this.closePopup.bind(this), 5000);
        });
    };

    private onSaveCallback = () => {
        if (!store.getState().user) {
            showModal('login');
            return;
        }

        const select = document.querySelector('.pin-view__board-list') as HTMLSelectElement;
        if (select.value === '') {
            this.setState((s) => {
                return { ...s, response: 'Choose an existing board or create a new one' };
            });
            return;
        }

        Board.addPinToBoard(parseInt(select.value), this.state.pin?.id!)
            .then((res) => {
                switch (res.status) {
                    case 204:
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
            })
            .then(() => {
                setTimeout(() => {
                    this.setState((state) => {
                        return { ...state, response: '' };
                    });
                }, 1500);
            });
    };

    private onLoadUser = () => {
        if (store.getState().type !== 'loadedUser') return;
        const id = this.state.pin?.id!;
        Pin.getPin(id).then((pin) => {
            this.getFollowStatus(pin.author.id);
            this.setState((state) => {
                return { ...state, isLiked: pin.liked };
            });
        });
        this.getAvailableBoards();
    };

    getAvailableBoards = () => {
        Board.getBoards().then((boards) => {
            this.setState((state) => {
                return { ...state, availableBoards: boards };
            });
        });
    };

    getPin = (id: number) => {
        Pin.getPin(id).then((pin) => {
            this.setState((s) => {
                return {
                    ...s,
                    pin: pin,
                    isLiked: pin.liked,
                    pinInfoLoad: store.getState().user === undefined,
                    isFollow: false,
                };
            });

            if (!store.getState().user) return;
            this.getFollowStatus(pin.author.id);
        });
    };

    getFollowStatus = (id: number) => {
        User.getFollowers(id).then((followers) => {
            this.setState((s) => {
                return {
                    ...s,
                    pinInfoLoad: true,
                    isFollow:
                        followers.find((f) => {
                            return f.id === store.getState().user?.id;
                        }) !== undefined,
                };
            });
        });
    };

    onUpdatePin = () => {
        if (store.getState().type !== 'updatePin') return;
        if (store.getState().pinId === this.state.pin?.id) return;
        this.getPin(store.getState().pinId);
        this.getAvailableBoards();
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onUpdatePin));
        this.unsubs.push(store.subscribe(this.onLoadUser));
        const id = Number(store.getState().page.split('/')[2]);
        this.getPin(id);
        this.getAvailableBoards();
    }

    private setCommentsLoadFlag() {
        this.setState((state) => {
            return {
                ...state,
                commentsLoad: true,
            };
        });
    }

    private onLikePin = () => {
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

    private onDislikePin = () => {
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

    private onFollow = () => {
        if (!store.getState().user) {
            showModal('login');
            return;
        }

        if (this.state.isFollow) {
            User.unfollow(this.state.pin?.author.id!).then(() => {
                this.setState((s) => {
                    return { ...s, isFollow: false };
                });
            });
        } else {
            User.follow(this.state.pin?.author.id!).then(() => {
                this.setState((s) => {
                    return { ...s, isFollow: true };
                });
            });
        }
    };

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    openPopup = function () {
        let popupBg = document.querySelector('.popup');
        popupBg?.classList.add('popup-active');
        let popup = document.querySelector('.popup__form');
        popup?.classList.add('popup__form-active');
    };

    closePopup = function () {
        let popupBg = document.querySelector('.popup');
        popupBg?.classList.remove('popup-active');
        let popup = document.querySelector('.popup__form');
        popup?.classList.remove('popup__form-active');
    };

    render() {
        return (
            <Main>
                <div className="popup">
                    <form className="popup__form">
                        <div className="popup__form__text">link copied!</div>
                        <span className="popup__form__close-btn">
                            <a
                                key="popup-close-btn"
                                className="material-symbols-outlined popup__close-btn__icon md-32"
                                onclick={this.closePopup.bind(this)}
                            >
                                close
                            </a>
                        </span>
                    </form>
                </div>
                <div className="pin-view">
                    <button
                        className="back-btn material-symbols-outlined md-32"
                        onclick={() => {
                            window.history.back();
                            if (store.getState().prevPage.startsWith('/pin/')) {
                                const id = store.getState().prevPage.split('/')[2];
                                store.dispatch({ type: 'updatePin', payload: { pinId: id } });
                            }
                        }}
                    >
                        arrow_back
                    </button>
                    <div className="pin-view__content">
                        <div
                            className="pin-view__img-wrapper"
                            style={`background-color: ${this.state.pin ? this.state.pin.media_source_color : ''};`}
                        >
                            <img className="pin-view__image" src={this.state.pin?.media_source!}></img>
                        </div>
                        {!this.state.pinInfoLoad ? (
                            <Loader />
                        ) : (
                            <div className="pin-view__info">
                                <div className="pin-view__actions">
                                    <div className="pin-view__actions-list">
                                        <button
                                            onclick={() => {
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
                                                'pin-view__actions-like-btn material-symbols-outlined md-32 ' +
                                                (this.state.isLiked ? 'active' : '')
                                            }
                                        >
                                            favorite
                                        </button>

                                        <p key="like-counter" className="pin-view__actions-stat">
                                            {String(this.state.pin ? this.state.pin.n_likes : '')}
                                        </p>
                                        <button
                                            key="share_btn"
                                            className="pin-view__actions-like-btn material-symbols-outlined md-32"
                                            href="/pin-changing"
                                            onclick={this.CopyLink.bind(this)}
                                        >
                                            share
                                        </button>
                                        <select name="boardName" className="pin-view__board-list">
                                            {...this.state.availableBoards.map((board) => {
                                                return <option value={board.id}>{board.name}</option>;
                                            })}
                                            <input type="text" />
                                        </select>
                                        <button
                                            className="pin-view__actions-save-btn"
                                            onclick={this.onSaveCallback.bind(this)}
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <span
                                        className={`pin-view__response-container`}
                                        style={`height: ${this.state.response ? '45px' : '0px'};`}
                                    >
                                        {this.state.response}
                                    </span>
                                </div>
                                <p className="pin-view__title">
                                    {this.state.pin?.title ? this.state.pin?.title.slice(0, 20) : ''}
                                </p>
                                <p className="pin-view__description">
                                    {this.state.pin?.description ? this.state.pin?.description.slice(0, 40) : ''}
                                </p>
                                <div className="pin-view__author">
                                    <img
                                        className="pin-view__author-avatar-img"
                                        src={this.state.pin?.author?.profile_image ?? ''}
                                        alt="Pin author avatar"
                                    ></img>
                                    <p className="pin-view__author-name">{this.state.pin?.author.username ?? ''}</p>
                                </div>
                                {this.state.pin && this.state.pin.author.id !== store.getState().user?.id ? (
                                    <button
                                        className={`pin-view__follow-btn ${this.state.isFollow ? 'active' : ''}`}
                                        onclick={this.onFollow}
                                    >
                                        {this.state.isFollow ? 'unfollow' : 'follow'}
                                    </button>
                                ) : (
                                    ''
                                )}

                                <p className="pin-view__comments-header">Comments</p>
                                <CommentList
                                    pin={this.state.pin}
                                    onLoadListCallback={this.setCommentsLoadFlag.bind(this)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Main>
        );
    }
}
