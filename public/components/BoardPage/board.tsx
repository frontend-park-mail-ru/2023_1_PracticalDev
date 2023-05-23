import { Component, createElement } from '@t1d333/pickpinlib';
import { IBoard, IPin, IUser } from '../../models';
import Feed from '../Feed/feed';
import { store } from '../../store/store';
import Board from '../../models/board';
import { loadBoard } from '../../actions/board';
import { navigate } from '../../actions/navigation';
import { Main } from '../Main/main';

import './board.css';

type BoardScreenProps = {};
type BoardScreenState = {
    board: IBoard | undefined;
    pins: IPin[];
    isLoading: boolean;
};

export class BoardScreen extends Component<BoardScreenProps, BoardScreenState> {
    private unsubs: (() => void)[] = [];
    private id: number = 0;

    constructor() {
        super();
        this.state = {
            board: store.getState().boardView,
            pins: [],
            isLoading: true,
        };
    }

    private LoadPinsCallback() {
        if (store.getState().type !== 'loadedPins') {
            return;
        }
        const pins = store.getState().pins;
        this.setState((s: BoardScreenState) => {
            return {
                ...s,
                pins: pins,
                isLoading: false,
            };
        });
    }

    private LoadBoardInfoCallback() {
        if (store.getState().type !== 'loadedBoard') {
            return;
        }

        this.setState((s: BoardScreenState) => {
            return {
                ...s,
                board: store.getState().boardView,
            };
        });
    }

    private DeleteBoardCallback() {
        Board.deleteBoard(this.state.board?.id!).then(() => {
            navigate('/profile');
        });
    }
    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.LoadPinsCallback.bind(this)));
        this.unsubs.push(store.subscribe(this.LoadBoardInfoCallback.bind(this)));

        this.id = Number(location.href.split('/')[4]);

        if (store.getState().boardId === 0) {
            store.dispatch({
                type: 'boardView',
                payload: {
                    boardId: this.id,
                },
            });
        }

        Board.getBoard(this.id)
            .then((res) => {
                loadBoard(res);
            })
            .then(() => {
                Board.getBoardPins(this.id).then((res) => {
                    store.dispatch({
                        type: 'loadedPins',
                        payload: { pins: res },
                    });
                });
            });
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        const curPage = location.href.split('/')[3];
        return (
            <Main>
                <div className="board-header">
                    <button
                        className="back-btn material-symbols-outlined md-32"
                        onclick={() => {
                            window.history.back();
                        }}
                    >
                        arrow_back
                    </button>

                    <h2 className="board-header__name">{this.state.board?.name || ''}</h2>
                    <div className="board-header__buttons-container">
                        {curPage === 'board-changing' ? (
                            <button
                                className="board-header__btn material-symbols-outlined md-24"
                                onclick={this.DeleteBoardCallback.bind(this)}
                            >
                                delete
                            </button>
                        ) : (
                            <div> </div>
                        )}
                    </div>
                </div>
                {this.state.pins.length > 0 ? (
                    <Feed pins={this.state.pins} />
                ) : (
                    <div className="board__empty">
                        <h2 className="board__empty-header">There are no pins on this board</h2>
                        <button
                            className="profile-tab__create-btn"
                            onclick={() => {
                                navigate('/feed');
                            }}
                        >
                            Go to feed
                        </button>
                    </div>
                )}
            </Main>
        );
    }
}
