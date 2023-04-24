import Ajax from '../util/ajax';
import { IBoard, IPin } from '../models';

export default class Board {
    static getBoards() {
        return Ajax.get('/boards').then((res) => {
            if (res.status === 200) {
                return res.body.items as IBoard[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static getBoard(id: number) {
        return Ajax.get(`/boards/${id}`).then((res) => {
            if (res.status === 200) {
                return res.body as IBoard;
            } else {
                return Promise.reject();
            }
        });
    }

    static deleteBoard(id: number) {
        return Ajax.delete(`/boards/${id}`).then((res) => {
            if (res.status === 204) {
                return true;
            } else {
                return Promise.reject(res);
            }
        });
    }

    static updateBoard(board: IBoard) {
        return Ajax.put(`/boards/${board.id}`, board).then((res) => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
        });
    }

    static getBoardPins(id: number) {
        return Ajax.get(`/boards/${id}`).then((res) => {
            if (res.status === 200) {
                return res.body.pins as IPin[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static deletePinFromBoard(boardId: number, pinId: number) {
        return Ajax.delete(`/boards/${boardId}/${pinId}`).then((res) => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
        });
    }
}
