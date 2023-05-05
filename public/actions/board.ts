import { IBoard } from '../models';
import { store } from '../store/store';

export const loadBoard = (board: IBoard) => {
    store.dispatch({ type: 'loadedBoard', payload: { board: board } });
};

export const loadAvailableBoards = (boards: IBoard[]) => {
    store.dispatch({ type: 'loadedAvailableBoards', payload: { boards: boards } });
};
