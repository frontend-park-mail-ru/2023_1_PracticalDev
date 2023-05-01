import { store } from '../store/store';

export const navigate = (page: string) => {
    store.dispatch({ type: 'navigate', payload: { page: page } });
};
