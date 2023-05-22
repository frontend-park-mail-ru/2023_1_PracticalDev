import { store } from '../store/store';

export const showModal = (contentTag: string) => {
    store.dispatch({
        type: 'showModal',
        payload: {
            modalContentTag: contentTag,
        },
    });
};

export const hideModal = () => {
    store.dispatch({
        type: 'hideModal',
    });
};
