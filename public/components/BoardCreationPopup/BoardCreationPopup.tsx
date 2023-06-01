import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IBoard } from '../../models';
import './BoardCreationPopup.css';
type BoardCreationPopupProps = {};
type BoardCreationPopupState = { board: IBoard | undefined };
import { navigate } from '../../actions/navigation';
import { hidePopup } from '../../actions/popup';

export class BoardCreationPopup extends Component<BoardCreationPopupProps, BoardCreationPopupState> {
    protected state: BoardCreationPopupState = {
        board: store.getState().newBoard,
    };

    render() {
        return this.state.board ? (
            <div className="board-creation-popup">
                {`Board "${
                    this.state.board.name.length > 20
                        ? this.state.board.name.slice(0, 20) + '...'
                        : this.state.board.name
                }" successfully created`}

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
                            hidePopup();
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
