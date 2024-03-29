import { IBoard, IPin, IUser } from '../models';
import { store } from '../store/store';

export const loginUser = (user: IUser) => {
    store.dispatch({ type: 'navigate', payload: { page: '/feed', user: user } });
};

export const logoutUser = () => {
    store.dispatch({
        type: 'navigate',
        payload: {
            page: '/login',
            user: undefined,
        },
    });
    store.dispatch({
        type: 'logout',
    });
};

export const loadUser = (user: IUser) => {
    store.dispatch({ type: 'loadedUser', payload: { user: user } });
};

export const loadProfile = (pins: IPin[], boards: IBoard[], followers: IUser[], followees: IUser[]) => {
    store.dispatch({
        type: 'loadedProfile',
        payload: { profilePins: pins, profileBoards: boards, followers: followers, followees: followees },
    });
};
