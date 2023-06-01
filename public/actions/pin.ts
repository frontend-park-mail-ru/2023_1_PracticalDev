import { IBoard } from '../models';
import { store } from '../store/store';

export const savePinOnBoard = (status: number, board: IBoard) => {
    store.dispatch({ type: 'savePinOnBoard', payload: { board: board, status: status } });
};
