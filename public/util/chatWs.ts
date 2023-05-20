import { connectChatWs } from '../actions/chat';
import { store } from '../store/store';

export class ChatWs {
    static createSocket() {
        // const url = 'wss://pickpin.ru/api/chat';
        const url = 'ws://localhost:81/api/chat';
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Chat web socket connection created');
            connectChatWs(socket);
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

        store.subscribe(() => {
            if (store.getState().type === 'logout') {
                socket.close();
            }
        });
    }
}
