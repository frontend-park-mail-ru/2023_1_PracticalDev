import Ajax from '../util/ajax';
import { IUser, IBoard } from '../models';
import Board from './board';
import { store } from '../store/store';

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
                if (res.ok) {
                    const token = this.getCSRF();
                    this.saveCSRF(token);
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
        return Ajax.get(`/api/users/${id}/followees`).then((res) => {
            if (res.ok) {
                return res.body.followees as IUser[];
            } else {
                return Promise.reject(res);
            }
        });
    }

    static follow(id: number) {
        return Ajax.post(`/api/users/${id}/following`, {});
    }

    static unfollow(id: number) {
        return Ajax.delete(`/api/users/${id}/following`);
    }

    static getChats(userId: number) {
        return Ajax.get('/api/chats')
            .then((res) => {
                return res.body.items;
            })
            .then((chats) => {
                return Promise.all(
                    chats.map((chat: any) => {
                        return Ajax.get(`/api/users/${chat.user1_id === userId ? chat.user2_id : chat.user1_id}`).then(
                            (res) => {
                                return res.body;
                            },
                        );
                    }),
                );
            });
    }

    static getUser(id: number) {
        return Ajax.get(`/api/users/${id}`).then((res) => {
            if (res.ok) {
                return res.body as IUser;
            }
            return Promise.reject(res);
        });
    }

    static getChatMsg(id: number) {
        return Ajax.get(`/api/messages?receiver_id=${id}`).then((res) => {
            if (res.status < 300) {
                return res.body.items;
            }
            return Promise.reject(res);
        });
    }
}
