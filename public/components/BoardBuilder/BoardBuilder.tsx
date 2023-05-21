import { Component, createElement } from '@t1d333/pickpinlib';
import Board from '../../models/board';
import './BoardBuilder.css';
import { hideModal } from '../../actions/modal';
import { navigate } from '../../actions/navigation';
type BoardBuilderProps = {};

type BoardBuilderState = {
    errMsg: string;
};

export class BoardBuilder extends Component<BoardBuilderProps, BoardBuilderState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = { errMsg: '' };
    }

    private createBoardHandler = () => {
        const input = document.querySelector('.createBoard__input') as HTMLInputElement;
        if (!input.value) {
            this.setState((s) => {
                return {
                    errMsg: 'Enter board name',
                };
            });
            return;
        }

        if (input.value.length > 30) {
            this.setState((s) => {
                return {
                    errMsg: 'Board name must be shorter than 30 characters',
                };
            });
            return;
        }

        Board.createBoard(input.value)
            .then((board) => {
                hideModal();
                navigate(`/board-changing/${board.id}`);
            })
            .catch((res) => {
                this.setState((s) => {
                    return {
                        errMsg: 'Server error',
                    };
                });
            });
    };

    render() {
        return (
            <div className="createBoard__formContainer">
                <div className="createBoard__form">
                    <h1 className="createBoard__header">Create the board</h1>
                    <p className="createBoard_error">{this.state.errMsg}</p>
                    <div className="createBoard__input_container">
                        <input
                            className="input__custom createBoard__input"
                            placeholder="Board name"
                            min="1"
                            max="10"
                        ></input>
                        <button className="createBoard__button" onclick={this.createBoardHandler}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
