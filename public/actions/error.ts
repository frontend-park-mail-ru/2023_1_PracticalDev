import { store } from '../store/store';

export const validationError = (errMsg: string) => {
    store.dispatch({
        type: 'validationErrorMessage',
        payload: {
            message: errMsg,
        },
    });
};
