import { Store, Reducer, Action } from '@t1d333/pickpinreduxlib';
import { IMessage, IPin, IUser, IBoard, IBoardWithPins, IChat, INotification } from '../models';

interface StoreState {
    page: string;
    prevPage: string;
    pushToState: boolean;
    pins: IPin[];
    formData: { [_: string]: any };
    validationErrorMessage: string;
    user: IUser | undefined;
    pinCreationErrorMsg: string;
    pinChangingErrorMsg: string;
    profileBoards: IBoardWithPins[];
    author: IUser | undefined;
    profilePins: IPin[];
    changingPin: IPin | undefined;
    type: string;
    pinView: IPin | undefined;
    pinId: number;
    boardView: IBoard | undefined;
    boardId: number;
    availableBoards: IBoard[];
    followers: IUser[];
    followees: IUser[];
    searchQuery: string;
    chatConnection: WebSocket | undefined;
    notificationConnection: WebSocket | undefined;
    message: IMessage | undefined;
    chat: IChat | undefined;
    modalContentTag: string;
    feedPos: number;
    newNotification: INotification | undefined;
    notifications: INotification[];
}

const initialState: StoreState = {
    page: '',
    prevPage: '',
    pushToState: true,
    pins: [],
    formData: {},
    validationErrorMessage: '',
    user: undefined,
    profilePins: [],
    profileBoards: [],
    availableBoards: [],
    pinView: undefined,
    pinId: 0,
    boardView: undefined,
    author: undefined,
    pinCreationErrorMsg: '',
    changingPin: undefined,
    pinChangingErrorMsg: '',
    type: '',
    boardId: 0,
    followers: [],
    followees: [],
    searchQuery: '',
    chatConnection: undefined,
    notificationConnection: undefined,
    message: undefined,
    chat: undefined,
    modalContentTag: '',
    feedPos: 0,
    newNotification: undefined,
    notifications: [],
};

const reducer: Reducer<StoreState> = (state: StoreState = initialState, action: Action) => {
    switch (action.type) {
        case 'safeFeedPos':
            return {
                ...state,
                feedPos: action.payload?.feedPos,
                type: 'safeFeedPos',
            };
        case 'navigate':
            if (action.payload?.page === state.page) {
                return { ...state, type: 'navigate' };
            }
            return {
                ...state,
                ...(action.payload || {}),
                prevPage: state.page,
                type: 'navigate',
            };

        case 'loadedPins':
            return {
                ...state,
                pins: action.payload?.pins,
                type: 'loadedPins',
            };

        case 'updateLikeState':
            return {
                ...state,
                pins: action.payload?.pins,
                type: 'updateLikeState',
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
                pinCreationErrorMsg: action.payload?.message,
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
                followers: action.payload?.followers,
                followees: action.payload?.followees,
                type: 'loadedProfile',
            };

        case 'pinChanging':
            return {
                ...state,
                changingPin: action.payload?.changingPin,
            };

        case 'updatePin':
            return {
                ...state,
                pinId: action.payload?.pinId,
                type: 'updatePin',
            };

        case 'pinChangingError':
            return {
                ...state,
                type: 'pinChangingError',
                pinChangingErrorMsg: action.payload?.message,
            };

        case 'pinView':
            return {
                ...state,
                pinView: action.payload?.pin,
                type: 'pinView',
            };

        case 'loadedPinInfo':
            return {
                ...state,
                author: action.payload?.author,
                type: 'loadedPinInfo',
            };

        case 'loadedBoard': {
            return {
                ...state,
                boardView: action.payload?.board,
                type: 'loadedBoard',
            };
        }

        case 'loadedAvailableBoards':
            return {
                ...state,
                availableBoards: action.payload?.boards,
                type: 'loadedAvailableBoards',
            };

        case 'boardView':
            return {
                ...state,
                boardId: action.payload?.boardId,
                type: 'boardView',
            };

        case 'restoreState':
            return {
                ...state,
                pushToState: true,
                type: 'restoreState',
            };

        case 'search':
            return {
                ...state,
                type: 'search',
                searchQuery: action.payload?.query,
            };

        case 'connectChatWs': {
            return {
                ...state,
                type: 'connectChatWs',
                chatConnection: action.payload?.wsConnection,
            };
        }

        case 'connectNotificationWs': {
            return {
                ...state,
                type: 'connectNotificationWs',
                notificationConnection: action.payload?.wsConnection,
            };
        }
        case 'newMessage': {
            return {
                ...state,
                type: 'newMessage',
                message: action.payload?.message,
            };
        }

        case 'newChat': {
            return {
                ...state,
                type: 'newChat',
                chat: action.payload?.chat,
            };
        }
        case 'loadedNewPins':
            return {
                ...state,
                pins: [...state.pins, ...action.payload?.pins],
                type: 'loadedNewPins',
            };

        case 'showModal': {
            return {
                ...state,
                type: 'showModal',
                modalContentTag: action.payload?.modalContentTag,
            };
        }

        case 'hideModal': {
            return {
                ...state,
                type: 'hideModal',
            };
        }

        case 'logout': {
            return {
                ...state,
                user: undefined,
                type: 'logout',
            };
        }

        case 'loadNotifications':
            return {
                ...state,
                notifications: action.payload?.notifications,
                type: 'loadNotifications',
            };

        case 'newNotification':
            return {
                ...state,
                newNotification: action.payload?.notification,
                notifications: [...state.notifications, action.payload?.notification],
                type: 'newNotification',
            };

        default:
            return state;
    }
};

const store = new Store<StoreState>(reducer, initialState);

type IStore = Store<StoreState>;

export { store };
