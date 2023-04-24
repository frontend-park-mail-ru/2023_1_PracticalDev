import { store } from '../store/store';

const navigate = (page: string, loadRes: () => Promise<any>) => {
    loadRes().then(() => {
        store.dispatch({ type: 'navigate', payload: { page: page } });
    });
};
