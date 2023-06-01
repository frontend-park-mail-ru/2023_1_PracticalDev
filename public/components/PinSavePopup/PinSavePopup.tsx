import { Component, createElement } from '@t1d333/pickpinlib';
import { store } from '../../store/store';
import { IBoard } from '../../models';
type PinSavePopupProps = {};
type PinSavePopupState = { board: IBoard | undefined; status: number };
import { navigate } from '../../actions/navigation';
import { hidePopup } from '../../actions/popup';

export class PinSavePopup extends Component<PinSavePopupProps, PinSavePopupState> {
    protected state = {
        board: store.getState().boardView,
        status: store.getState().pinSavingStatus,
    };

    statusToContent = (status: number) => {
        switch (status) {
            case 204:
                return this.state.board
                    ? `Pin successfully saved on board "${
                          this.state.board.name.length > 20
                              ? this.state.board.name.slice(0, 20) + '...'
                              : this.state.board.name
                      }"`
                    : '';
            case 409:
                return 'The pin has already been saved on this board';
            default:
                return 'The server is currently unavailable';
        }
    };

    render() {
        return this.state.board ? (
            <div className="board-creation-popup">
                {this.statusToContent(this.state.status)}
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
