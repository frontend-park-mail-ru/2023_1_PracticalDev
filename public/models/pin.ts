import Ajax, { HEADERS } from '../util/ajax';
import { IPin, IUser } from '../models';
export class Pin {
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
        return Ajax.get(`/api/pins/${id}`).then((res) => {
            if (res.ok) {
                return res.body as IPin;
            }
            return Promise.reject(res);
        });
    }

    static uploadPin(fd: FormData) {
        return Ajax.post('/api/pins', fd, true);
    }

    static deletePin(id: number) {
        //TODO: пофиксить ajax
        // return Ajax.delete(`/api/pins/${id}`);
        return fetch(`/api/pins/${id}`, {
            method: 'delete',
            headers: {
                [HEADERS.csrf]: localStorage.getItem('csrf'),
            } as HeadersInit,
        });
    }

    static updatePin(pin: IPin) {
        const fd = new FormData();
        fd.append('title', pin.title);
        fd.append('description', pin.description);
        return Ajax.put(`/api/pins/${pin.id}`, fd);
    }

    static getPinAuhtor(pin: IPin) {
        const author = Ajax.get(`/api/users/${pin.author_id}`).then((res) => {
            return res.body as IUser;
        });
        return author;
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

    static LikePin(id: number) {
        return Ajax.post(`/api/pins/${id}/like`, {});
    }

    static UnLikePin(id: number) {
        return Ajax.delete(`/api/pins/${id}/like`);
    }
}
