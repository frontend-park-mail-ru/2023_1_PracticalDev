import { Store, Reducer, Action } from '@t1d333/pickpinreduxlib';
import { IPin, IUser } from '../models';

interface StoreState {
    page: string;
    pins: IPin[];
    formData: { [_: string]: any };
    validationErrorMessage: string;
    user: IUser | undefined;
    type: string;
}

const initialState: StoreState = {
    page: 'feed',
    pins: [],
    formData: {},
    validationErrorMessage: '',
    user: undefined,
    type: '',
};

const reducer: Reducer<StoreState> = (state: StoreState = initialState, action: Action) => {
    switch (action.type) {
        case 'navigate':
            return {
                ...state,
                page: action.payload?.page,
                type: 'navigate',
            };
        case 'loadedPins':
            return {
                ...state,
                pins: action.payload?.pins,
                type: 'loadedPins',
            };
        case 'addedPins':
            return {
                ...state,
                pins: state.pins.concat(action.payload?.pins),
                type: 'addedPins',
            };
        case 'removedPins':
            return {
                ...state,
                pins: [],
                type: 'removedPins',
            };
        case 'loginFormSubmit':
            return {
                ...state,
                formData: action.payload?.formData,
                type: 'loginFormSubmit',
            };
        case 'validationErrorMessage':
            return {
                ...state,
                validationErrorMessage: action.payload?.message,
                type: 'validationErrorMessage',
            };
        case 'user':
            return {
                ...state,
                user: action.payload?.user,
                type: 'user',
            };
        default:
            return state;
    }
};

const store = new Store<StoreState>(reducer, initialState);

type IStore = Store<StoreState>;

export { store };
