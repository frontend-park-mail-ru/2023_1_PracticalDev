import { connectNotificationWs, newNotification } from '../actions/notification';
import { store } from '../store/store';

export class NotificationWs {
    static createSocket() {
        // const url = 'wss://pickpin.ru/api/ws/notifications';
        const url = 'ws://localhost:81/api/ws/notifications';
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Notification web socket connection created');
            connectNotificationWs(socket);
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            newNotification(data.content);
        };

        store.subscribe(() => {
            if (store.getState().type === 'logout') {
                socket.close();
            }
        });
    }
}
