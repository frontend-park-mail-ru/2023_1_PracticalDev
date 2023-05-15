import { store } from '../store/store';

export class ChatWs {
    static createSocket() {
        // const url = 'wss://pickpin.ru/api/chat';
        const url = 'ws://localhost:81/api/chat';
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Web socket connection created');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'message':
                    store.dispatch({ type: 'newMessage', payload: { message: data.message } });
                    break;

                case 'new_chat':
                    store.dispatch({ type: 'newChat', payload: { chat: data.chat } });
                    break;
            }
        };

        store.dispatch({
            type: 'connectWs',
            payload: {
                wsConnection: socket,
            },
        });
        store.subscribe(() => {
            if (store.getState().type === 'logout') {
                socket.close();
            }
        });
    }
}
