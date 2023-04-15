import Ajax from '../util/ajax';
import { IUser, IPin, IBoard } from '../models';
import { IBoardListItem } from '../components/BoardList/boardlist';
import Board from './board';

export default class User {
    static getMe() {
        return Ajax.get('/api/auth/me').then((res) => {
            if (res.ok) {
                return res.body;
            }
            return Promise.reject(res);
        });
    }

    static login(email: string, password: string) {
        return Ajax.post('/api/auth/login', {
            email: email,
            password: password,
        }).then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            } else {
                return response.body as IUser;
            }
        });
    }

    static logout() {
        return Ajax.delete('/api/auth/logout').then((res) => {
            if (res.ok) {
                return true;
            } else {
                return Promise.reject(res.body);
            }
        });
    }

    static signup(username: string, name: string, email: string, password: string) {
        return Ajax.post('/api/auth/signup', { name: name, username: username, email: email, password: password }).then(
            (res) => {
                if (res.ok) {
                    return res.body as IUser;
                }
                return Promise.reject(res);
            },
        );
    }

    static getUserProfile = (id: number) => {
        const pinsReq = Ajax.get(`/api/users/${id}/pins`).then((resp) => {
            if (resp.ok) {
                return resp.body.pins || [];
            }
        });

        const boardsReq = Board.getBoards()
            .then((boards) => {
                return boards;
            })
            .then((boards) => {
                return Promise.all(
                    boards.map((board: IBoard) => {
                        return Board.getBoardPins(board.id).then((res) => {
                            return { ...board, pins: res || [] };
                        });
                    }),
                );
            });
        return Promise.all([pinsReq, boardsReq]);
    };

    static patchUser = async (fd: FormData) => {
        const resp = await Ajax.patch('/api/profile', fd);
        return resp;
    };
}
