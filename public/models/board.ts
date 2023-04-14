import Ajax from '../util/ajax';
import { IBoard, IPin } from '../models';

export default class Board {
    static getBoards() {
        return Ajax.get('/api/boards').then((res) => {
            if (res.status === 200) {
                return res.body.boards as IBoard[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static getBoard(id: number) {
        return Ajax.get(`/api/boards/${id}`).then((res) => {
            if (res.status === 200) {
                return res.body as IBoard;
            } else {
                return Promise.reject();
            }
        });
    }

    static deleteBoard(id: number) {
        return Ajax.delete(`/api/boards/${id}`).then((res) => {
            if (res.status !== 204) {
                return Promise.reject(res);
            }
        });
    }

    static updateBoard(board: IBoard) {
        return Ajax.put(`/api/boards/${board.id}`, board).then((res) => {
            if (res.status !== 200) {
                return Promise.reject(res);
            }
        });
    }

    static getBoardPins(id: number) {
        return Ajax.get(`/api/boards/${id}/pins`).then((res) => {
            if (res.status === 200) {
                return res.body.pins as IPin[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static deletePinFromBoard(boardId: number, pinId: number) {
        console.log(boardId, pinId);
        return Ajax.delete(`/api/boards/${boardId}/pins/${pinId}`).then((res) => {
            if (res.status !== 204) {
                return Promise.reject(res);
            }
        });
    }
}
