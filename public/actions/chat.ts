import { store } from '../store/store';

const connectChatWs = (ws: WebSocket) => {
    store.dispatch({ type: 'connectChatWs', payload: { wsConnection: ws } });
};

const onSendMsg = (input: {value: string}) => {
    const msgText = input.value;
    if (!msgText) {
        return;
    }
    const socket = store.getState().chatConnection;
    socket?.send(JSON.stringify({ text: msgText}));
    input.value = '';
};

const onNewMsg = () => {
    if (store.getState().type !== 'newMessage') {
        return;
    }

    const msg = store.getState().message;
    if (msg?.author_id !== 0 && msg?.author_id !== store.getState().user?.id) {
        return;
    }
    return msg
};

export {connectChatWs, onSendMsg, onNewMsg}
