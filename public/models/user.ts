import Ajax from '../util/ajax';
import { IUser, IBoard } from '../models';
import Board from './board';

export default class User {
    static getCSRF() {
        const [cookie] = document.cookie.split(';').filter((cookie) => {
            return cookie.startsWith('XSRF-TOKEN');
        });
        return cookie ? cookie.split('=')[1] : '';
    }

    static saveCSRF(token: string) {
        localStorage.setItem('csrf', token);
    }

    static getMe() {
        return Ajax.get('/api/auth/me').then((res) => {
            if (res.ok) {
                return res.body as IUser;
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
                const token = this.getCSRF();
                this.saveCSRF(token);
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
                console.log(res);
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

        const boardsReq = Board.getBoards().then((boards) => {
            return Promise.all(
                boards.map((board: IBoard) => {
                    return Board.getBoardPins(board.id).then((res) => {
                        return { ...board, pins: res || [] };
                    });
                }),
            );
        });

        const followersReq = Ajax.get(`/api/users/${id}/followers`).then((res) => {
            if (res.ok) {
                return res.body.followers as IUser[];
            }
        });

        const followeesReq = Ajax.get(`/api/users/${id}/followees`).then((res) => {
            if (res.ok) {
                return res.body.followees as IUser[];
            }
        });
        return Promise.all([pinsReq, boardsReq, followersReq, followeesReq]);
    };

    static patchUser = async (fd: FormData) => {
        const resp = await Ajax.patch('/api/profile', fd);
        return resp;
    };

    static getFollowers(id: number) {
        return Ajax.get(`/api/users/${id}/followers`).then((res) => {
            if (res.ok) {
                return res.body.followers as IUser[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static getFollowees(id: number) {
        return fetch(`/api/users/${id}/followees/`)
            .then((res) => {
                console.log(res);
                let a;
                try {
                    a = res.json();
                } catch (e) {
                    console.log(e);
                }
                return a;
            })
            .then((res) => {
                console.log(res);
                return res;
            });
    }

    static follow(id: number) {
        return Ajax.post(`/api/users/${id}/following`, {});
    }

    static unfollow(id: number) {
        return Ajax.delete(`/api/users/${id}/following`);
    }
}
