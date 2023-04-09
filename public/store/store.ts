import { Store, Reducer, Action } from '@t1d333/pickpinreduxlib';

interface StoreState {
    page: string;
    counter: number;
}

const initialState: StoreState = {
    page: 'feed',
    counter: 1,
};

const reducer: Reducer<StoreState> = (state: StoreState = initialState, action: Action) => {
    switch (action.type) {
        case 'navigate':
            return {
                ...state,
                page: action.payload?.page,
            };
        default:
            return state;
    }
};

const store = new Store<StoreState>(reducer, initialState);

type IStore = Store<StoreState>

export { store };
