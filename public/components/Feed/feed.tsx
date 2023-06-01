import { Component, createElement } from '@t1d333/pickpinlib';
import { Pin } from '../Pin/pin';
import { IBoard, IPin } from '../../models';
import { store } from '../../store/store';
import './feed.css';
import Board from '../../models/board';
import { loadAvailableBoards } from '../../actions/board';
import { navigate } from '../../actions/navigation';

interface FeedProps {
    pins: IPin[];
}

interface FeedState {
    availableBoards: IBoard[];
}

export default class Feed extends Component<FeedProps, FeedState> {
    private unsubs: Function[] = [];
    protected state: FeedState = { availableBoards: store.getState().availableBoards };

    onLoadAvailableBoards = () => {
        if (store.getState().type !== 'loadedAvailableBoards') return;
        this.setState(() => {
            return { availableBoards: store.getState().availableBoards };
        });
    };

    private onNewBoard = () => {
        if (store.getState().type !== 'showResponsePopup' || store.getState().popupTag !== 'newBoard') return;
        const board = store.getState().newBoard!;
        this.setState((state) => {
            return { ...state, availableBoards: [...state.availableBoards, board] };
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onLoadAvailableBoards));
        this.unsubs.push(store.subscribe(this.onNewBoard));
        if (!store.getState().user) return;
        Board.getBoards().then((boards) => {
            loadAvailableBoards(boards);
        });
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
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
            <div className="pin_container" id="pin_container">
                <div className="popup">
                    <form className="popup__form">
                        <div className="popup__form__text">Link copied!</div>
                        <button
                            className="material-symbols-outlined popup__close-btn md-32"
                            onclick={this.closePopup.bind(this)}
                        >
                            close
                        </button>
                    </form>
                </div>
                {store.getState().page === '/profile' ? (
                    <button
                        className="card card_small profile__pin-creation-btn"
                        onclick={() => {
                            navigate('/pin-builder');
                        }}
                    >
                        <div>Create pin</div>
                        <div className="material-symbols-outlined md-40"> add</div>
                    </button>
                ) : (
                    ''
                )}
                {...(this.props.pins || []).map((pin) => {
                    return <Pin pin={pin} availableBoards={this.state.availableBoards} />;
                })}
            </div>
        );
    }
}
