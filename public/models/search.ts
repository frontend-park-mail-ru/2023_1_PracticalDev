import { IBoard, IPin, IUser } from '../models';
import Ajax from '../util/ajax';
import Board from './board';

export class Search {
    static getDataBySearchQuery(query: string) {
        return Ajax.get(`/api/search/${query}`)
            .then((res) => {
                if (res.ok) {
                    return {
                        pins: (res.body.pins ?? []) as IPin[],
                        boards: (res.body.boards ?? []) as IBoard[],
                        users: (res.body.users ?? []) as IUser[],
                    };
                }
                return Promise.reject(res);
            })
            .then((res) => {
                return {
                    ...res,
                    boards: Promise.all(
                        res.boards.map((board: IBoard) => {
                            return Board.getBoardPins(board.id).then((res) => {
                                return { ...board, pins: res || [] };
                            });
                        }),
                    ),
                };
            });
    }

    static async getSuggestions(query: string) {
        const res = await Ajax.get(`/api/search/${query}`);
        if (res.ok) {
            return [
                ...new Set([
                    ...(res.body.pins as IPin[]).map((pin) => {
                        return pin.title;
                    }),
                    ...(res.body.boards as IBoard[]).map((board) => {
                        return board.name;
                    }),
                    ...(res.body.users as IUser[]).map((user) => {
                        return user.username;
                    }),
                ]),
            ].slice(0, 10);
        }
        return Promise.reject(res);
    }
}
