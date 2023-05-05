import { IBoard, IPin, IUser } from '../models';
import { store } from '../store/store';
import Ajax from '../util/ajax';
import Board from './board';
import User from './user';

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
}
