import { store } from '../store/store';

export const safeFeedPos = (pos: number) => {
    store.dispatch({ type: 'safeFeedPos', payload: { feedPos: pos } });
};
