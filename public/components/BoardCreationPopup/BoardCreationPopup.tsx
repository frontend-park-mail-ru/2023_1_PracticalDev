import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IBoard } from '../../models';
import './BoardCreationPopup.css';
import { navigate } from '../../actions/navigation';
type BoardCreationPopupProps = {};
type BoardCreationPopupState = { visible: boolean; board: IBoard | undefined };

export class BoardCreationPopup extends Component<BoardCreationPopupProps, BoardCreationPopupState> {
    protected state: BoardCreationPopupState = {
        visible: false,
        board: undefined,
    };
    unsubs: Function[] = [];

    onShow = () => {
        if (store.getState().type !== 'newBoard') return;
        this.setState(() => {
            return { visible: true, board: store.getState().newBoard };
        });
        setTimeout(() => {
            this.setState((state) => {
                return { ...state, visible: false };
            });
        }, 2500);
    };

    componentDidMount() {
        this.unsubs.push(store.subscribe(this.onShow));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((func) => {
            func();
        });
    }
    render() {
        return this.state.board ? (
            <div className={`board-creation-popup ${this.state.visible ? 'active' : ''}`}>
                <div className="board-creation-popup__content">
                    {`Board "${
                        this.state.board.name.length > 20
                            ? this.state.board.name.slice(0, 20) + '...'
                            : this.state.board.name
                    }" successfully created`}
                </div>

                <hr />

                <div className="board-creation-popup__footer">
                    <button
                        className="board-creation-popup__btn navigate-btn"
                        onclick={() => {
                            navigate(`/board-changing/${this.state.board?.id}`);
                        }}
                    >
                        Go to board
                    </button>
                    <button
                        className="board-creation-popup__btn close-btn"
                        onclick={() => {
                            this.setState((state) => {
                                return { ...state, visible: false };
                            });
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        ) : (
            <div className="board-creation-popup"></div>
        );
    }
}
