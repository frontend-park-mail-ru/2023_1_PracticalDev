import { connectNotificationWs, newNotification } from '../actions/notification';
import { INotification } from '../models';
import { store } from '../store/store';
import Ajax from '../util/ajax';

export class Notification {
    public static connection: WebSocket;

    static createSocket() {
        // const url = 'wss://pickpin.ru/api/ws/notifications';
        const url = 'ws://localhost:81/api/ws/notifications';
        const socket = new WebSocket(url);
        socket.onopen = () => {
            console.log('Notification web socket connection created');
            this.connection = socket;
            connectNotificationWs(socket);
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'notification':
                    newNotification(data.content);
                    break;

                default:
                    break;
            }
        };

        store.subscribe(() => {
            if (store.getState().type === 'logout') {
                socket.close();
            }
        });
    }

    static async getNotifications() {
        const res = await Ajax.get('/api/notifications');
        if (res.ok) {
            return res.body.items as INotification[];
        }
        return Promise.reject(res);
    }

    static readNotification(notification: INotification) {
        this.connection.send(JSON.stringify({ id: notification.id }));
    }
}
