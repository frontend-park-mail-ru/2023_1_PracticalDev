import { Store, Reducer, Action } from '@t1d333/pickpinreduxlib';
import { IPin, IUser, IBoard } from '../models';

type Map = { [_: string]: any };

interface StoreState {
    page: string;
    pins: IPin[];
    formData: { [_: string]: any };
    validationErrorMessage: string;
    user: IUser | undefined;
    profileBoards: IBoard[];
    profilePins: IPin[];
    type: string;
}

const initialState: StoreState = {
    page: '/feed',
    pins: [],
    formData: {},
    validationErrorMessage: '',
    user: undefined,
    profilePins: [],
    profileBoards: [],
    type: '',
};

const reducer: Reducer<StoreState> = (state: StoreState = initialState, action: Action) => {
    switch (action.type) {
        case 'navigate':
            return {
                ...state,
                ...(action.payload || {}),
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
        case 'pinCreationError':
            return {
                ...state,
                error: action.payload?.message,
                type: 'pinCreationError',
            };
        case 'getUserPins':
            return {
                ...state,
                userPins: action.payload?.pins,
                type: 'getUserPins',
            };

        case 'loadedUser':
            return {
                ...state,
                user: action.payload?.user,
                type: 'loadedUser',
            };
        case 'loadedProfile':
            return {
                ...state,
                profilePins: action.payload?.profilePins,
                profileBoards: action.payload?.profileBoards,
                type: 'loadedProfile',
            };
        default:
            return state;
    }
};

const store = new Store<StoreState>(reducer, initialState);

type IStore = Store<StoreState>;

export { store };
