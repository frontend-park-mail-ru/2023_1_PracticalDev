import { store } from '../store/store';

// export const navigate = (page: string, loadRes: () => Promise<any>) => {
//     loadRes().then(() => {
//         store.dispatch({ type: 'navigate', payload: { page: page } });
//     });
// };

export const navigate = (page: string) => {
    store.dispatch({ type: 'navigate', payload: { page: page } });
};
