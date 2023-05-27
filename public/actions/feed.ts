import { IPin } from '../models';
import { store } from '../store/store';

export const safeFeedPos = (pos: number) => {
    store.dispatch({ type: 'safeFeedPos', payload: { feedPos: pos } });
};

export const loadNewPins = (pins: IPin[]) => {
    store.dispatch({
        type: 'loadedNewPins',
        payload: {
            pins: pins,
        },
    });
};

export const loadPins = (pins: IPin[]) => {
    store.dispatch({
        type: 'loadedPins',
        payload: {
            pins: pins,
        },
    });
};

export const loadPinView = (pin: IPin) => {
    store.dispatch({ type: 'pinView', payload: { pin: pin } });
};

export const updateLikeState = (pins: IPin[]) => {
    store.dispatch({ type: 'updateLikeState', payload: { pins: pins } });
};
