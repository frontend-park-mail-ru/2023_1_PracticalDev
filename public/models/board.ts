import Ajax, { HEADERS } from '../util/ajax';
import { IBoard, IPin } from '../models';

export default class Board {
    static async getBoards() {
        const res = await Ajax.get('/api/boards');
        if (res.status === 200) {
            return (res.body.boards || []) as IBoard[];
        } else {
            return Promise.reject(res);
        }
    }

    static async getBoard(id: number) {
        const res = await Ajax.get(`/api/boards/${id}`);
        if (res.status === 200) {
            return res.body as IBoard;
        } else {
            return Promise.reject(res);
        }
    }

    static deleteBoard(id: number) {
        return Ajax.delete(`/api/boards/${id}`);
    }

    static async updateBoard(board: IBoard) {
        const res = await Ajax.put(`/api/boards/${board.id}`, board);
        if (res.status !== 200) {
            return Promise.reject(res);
        }
    }

    static async getBoardPins(id: number) {
        const res = await Ajax.get(`/api/boards/${id}/pins`);
        if (res.status === 200) {
            return (res.body.pins || []) as IPin[];
        } else {
            return Promise.reject(res);
        }
    }

    static deletePinFromBoard(boardId: number, pinId: number) {
        // return Ajax.delete(`/api/boards/${boardId}/pins/${pinId}`);
        return fetch(`/api/boards/${boardId}/pins/${pinId}`, {
            method: 'delete',
            headers: {
                [HEADERS.csrf]: localStorage.getItem('csrf'),
            } as HeadersInit,
        });
    }

    static async createBoard(name: string) {
        const res = await Ajax.post('/api/boards', { name: name, description: '' });
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        return res.body as IBoard;
    }

    static addPinToBoard(boardId: number, pinId: number) {
        return Ajax.post(`/api/boards/${boardId}/pins/${pinId}`, {});
    }
}
