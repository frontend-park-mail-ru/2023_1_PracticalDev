import { INotification } from '../models';
import { store } from '../store/store';

export const connectNotificationWs = (ws: WebSocket) => {
    store.dispatch({ type: 'connectNotificationtWs', payload: { wsConnectoin: ws } });
};

export const newNotification = (notification: INotification) => {
    store.dispatch({ type: 'newNotification', payload: { notification: notification } });
};

export const loadNotifications = (notifications: INotification[]) => {
    store.dispatch({ type: 'loadNotifications', payload: { notifications: notifications } });
};
