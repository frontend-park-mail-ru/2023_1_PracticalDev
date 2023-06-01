import { store } from '../store/store';

export const hidePopup = () => {
    store.dispatch({ type: 'hideResponsePopup' });
};
