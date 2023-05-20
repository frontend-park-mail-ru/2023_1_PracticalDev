import { store } from '../store/store';

export const connectChatWs = (ws: WebSocket) => {
    store.dispatch({ type: 'connectChatWs', payload: { wsConnection: ws } });
};
