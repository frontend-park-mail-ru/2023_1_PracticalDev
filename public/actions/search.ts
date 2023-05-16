import { store } from '../store/store';

export const search = (query: string) => {
    store.dispatch({
        type: 'search',
        payload: {
            query: query,
        },
    });
};
