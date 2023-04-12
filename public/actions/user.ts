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
};

export const loadUser = (user: IUser) => {
    store.dispatch({ type: 'loadedUser', payload: { user: user } });
};

export const loadProfile = (pins: IPin[], boards: IBoard[]) => {
    store.dispatch({ type: 'loadedProfile', payload: { profilePins: pins, profileBoards: boards } });
};
