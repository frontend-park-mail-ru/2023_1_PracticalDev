import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import { store } from '../../store/store';
import { Pin as PinModel } from '../../models/pin';
import { IPin } from '../../models';
import Board from '../../models/board';
import { safeFeedPos } from '../../actions/feed';
import { IUser } from '../../models';

interface PinState {
    isLiked: boolean;
    author: IUser | undefined;
}

interface PinProps {
    pin: IPin;
    page: string;
}

export class Pin extends Component<PinProps, PinState> {
    private unsubs: Function[] = [];
    private sizes = ['card_small', 'card_medium', 'card_large'];
    private cardSize: string;

    constructor() {
        super();
        this.state = {
            author:undefined,
            isLiked: false,
        };
        this.cardSize = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    }

    private onClick = (event: any) => {
        if (store.getState().page === '/feed') {
            safeFeedPos(window.scrollY);
        }
        store.dispatch({ type: 'pinView', payload: { pin: this.props.pin } });
        navigate(`/pin/${this.props.pin.id}`);
    };

    private resolveSecondaryBtn = () => {
        const curPage = location.href.split('/')[3];
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
                        key="delete_btn"
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
                        key="like_btn"
                        onclick={this.state.isLiked ? this.onDislikePin.bind(this) : this.onLikePin.bind(this)}
                        className={
                            'pin__icon-btn material-symbols-outlined md-24 ' + (this.state.isLiked ? 'active' : '')
                        }
                    >
                        favorite
                    </button>
                );
        }
    };

    private onLikePin = (e: MouseEvent) => {
        PinModel.LikePin(this.props.pin.id).then((resp) => {
            if (resp.ok) {
                this.setState((_: PinState) => {
                    return {
                        author: this.state.author,
                        isLiked: true,
                    };
                });
            }
        });
    };

    private onDislikePin = (e: MouseEvent) => {
        PinModel.UnLikePin(this.props.pin.id).then((resp) => {
            if (resp.ok) {
                this.setState((_: PinState) => {
                    return {
                        author: this.state.author,
                        isLiked: false,
                    };
                });
            }
        });
    };

    private onChangePin = (e: MouseEvent) => {
        store.dispatch({ type: 'pinChanging', payload: { changingPin: this.props.pin } });
        navigate(`/pin-changing/${this.props.pin.id}`);
    };

    private onDeletePin = (e: MouseEvent) => {
        Board.deletePinFromBoard(store.getState().boardId, this.props.pin.id).then((res) => {
            const pins = store.getState().pins;

            store.dispatch({
                type: 'loadedPins',
                payload: {
                    pins: pins.filter((pin) => {
                        return pin.id !== this.props.pin.id;
                    }),
                },
            });
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

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onPinLoad.bind(this)));
        this.setState((_: PinState) => {
            return {
                author: this.state.author,
                isLiked: this.props.pin.liked,
            };
        });

        PinModel.getPinAuhtor(this.props.pin).then((author) => {
            this.setState((s) => {
                return {
                    ...s,
                    author: author,
                };
            });
        });
    }

    render() {
        return (
            <div key={'pin-' + this.props.pin.id} className={'card ' + this.cardSize} onclick={this.onClick.bind(this)}>
                <div key={'pin-title'} className="pin__title">
                    {this.props.pin.title}
                </div>

                <div key={'pin-modal'} className="pin__modal">
                    <div key={'pin-head'} className="pin__modal-head"></div>

                    <div key={'pin-foot'} className="pin__modal-foot">
                        <button
                            key="share_btn"
                            className="pin__icon-btn material-symbols-outlined md-24"
                            href="/pin-changing"
                        >
                            share
                        </button>
                        <img
                            key="author_avatar"
                            src={this.state.author?.profile_image ?? ''}
                            alt=""
                            className="pin__author-avatar"
                        />
                        {this.resolveSecondaryBtn()}
                    </div>
                </div>
                <img key="pin_img" className="pin__image" src={this.props.pin.media_source} alt="abc" srcset="" />
            </div>
        );
    }
}
