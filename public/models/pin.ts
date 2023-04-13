import Ajax from '../util/ajax';
import { IPin } from '../models';
export default class Pin {
    static getUserPins(id: number) {
        return Ajax.get(`/api/users/${id}/pins`).then((response) => {
            if (!response.ok) {
                if (response.status !== 200) {
                    return Promise.reject(response);
                }
            } else {
                return response.body as IPin[];
            }
        });
    }

    static getPin(id: number) {
        return Ajax.get(`/api/pins/${id}`).then();
    }

    static uploadPin(fd: FormData) {
        return fetch('/api/pins', { method: 'POST', body: fd });
    }

    static deletePin(id: number) {
        //TODO: пофиксить ajax
        return fetch(`/api/pins/${id}`, { method: 'delete' });
    }

    static updatePin(pin: IPin) {
        return Ajax.put(`/api/pins/${pin.id}`, pin);
    }

    static getFeed() {
        return Ajax.get('/api/pins').then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            } else {
                return response.body.pins;
            }
        });
    }
}
