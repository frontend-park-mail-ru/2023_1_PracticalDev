import { store } from '../store/store';

export const saveFeedPos = (pos: number) => {
    store.dispatch({ type: 'saveFeedPos', payload: { feedPos: pos } });
};
