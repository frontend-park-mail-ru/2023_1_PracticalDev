import { store } from '../store/store';

export class ChatWs {
    static createSocket() {
        const token = window.localStorage.getItem('csrf');
        const url = 'ws://localhost:8080/chat?csrf=' + token;
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
    }
}
