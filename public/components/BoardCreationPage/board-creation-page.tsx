import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { Header } from '../Header/header';
import { store } from '../../store/store';
import Board from '../../models/board';
import { navigate } from '../../actions/navigation';

type BoardCreationScreenProps = {};

type BoardCreationScreenState = {
    errMsg: string;
};

export class BoardCreationScreen extends Component<BoardCreationScreenProps, BoardCreationScreenState> {
    private unsubs: Function[] = [];
    constructor() {
        super();
        this.state = { errMsg: '' };
    }

    private createBoardHandler = () => {
        const input = document.querySelector('.createBoard__input') as HTMLInputElement;
        console.log(input.value.length);
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
                navigate(`/board/${board.id}`);
            })
            .catch((res) => {
                this.setState((s) => {
                    return {
                        errMsg: 'Server error',
                    };
                });
            });
    };

    componentDidMount(): void {}
    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header key="header" />
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <div key="container" class="createBoard__formContainer">
                            <div key="form" className="createBoard__form">
                                <h1 key="header" className="createBoard__header">
                                    Create the board
                                </h1>
                                <p key="error" className="createBoard_error">
                                    {this.state.errMsg}
                                </p>
                                <input
                                    key="input"
                                    className="createBoard__input"
                                    placeholder="Board name"
                                    min="1"
                                    max="10"
                                ></input>
                                <button
                                    key="button"
                                    className="createBoard__button"
                                    onclick={this.createBoardHandler.bind(this)}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
