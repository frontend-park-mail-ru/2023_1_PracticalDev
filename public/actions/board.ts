import { IBoard } from '../models';
import { store } from '../store/store';

export const loadBoard = (board: IBoard) => {
    store.dispatch({ type: 'loadedBoard', payload: { board: board } });
};

export const saveBoardId = (id: number) => {
    store.dispatch({
        type: 'boardView',
        payload: {
            boardId: id,
        },
    });
};

export const loadAvailableBoards = (boards: IBoard[]) => {
    store.dispatch({ type: 'loadedAvailableBoards', payload: { boards: boards } });
};

export const createBoard = (board: IBoard) => {
    store.dispatch({ type: 'boardCreation', payload: { board: board } });
};
