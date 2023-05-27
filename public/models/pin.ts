import Ajax, { HEADERS } from '../util/ajax';
import { IPin, IUser } from '../models';
export class Pin {
    static async getUserPins(id: number) {
        const response = await Ajax.get(`/api/users/${id}/pins`);
        if (!response.ok) {
            if (response.status !== 200) {
                return Promise.reject(response);
            }
        } else {
            return response.body as IPin[];
        }
    }

    static async getPin(id: number) {
        const res = await Ajax.get(`/api/pins/${id}`);
        if (res.ok) {
            return res.body as IPin;
        }
        return Promise.reject(res);
    }

    static async getLikedPins(id: number) {
        const response = await Ajax.get(`/api/pins?liked=true`);
        if (!response.ok) {
            return Promise.reject(response);
        } else {
            return response.body.pins as IPin[];
        }
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

    static async getFeed() {
        const response = await Ajax.get('/api/pins');
        if (!response.ok) {
            return Promise.reject(response);
        } else {
            return response.body.pins;
        }
    }

    static async getNewPins(pageNumber: number) {
        const res = await Ajax.get(`/api/pins?page=${pageNumber}&limit=30`);
        if (res.ok) {
            return res.body.pins as IPin[];
        } else {
            return Promise.reject(res);
        }
    }

    static LikePin(id: number) {
        return Ajax.post(`/api/pins/${id}/like`, {});
    }

    static UnLikePin(id: number) {
        return Ajax.delete(`/api/pins/${id}/like`);
    }

    static async getShareLink(id: number) {
        const response = await Ajax.post(`/api/share/pin/${id}`, {});
        if (!response.ok) {
            return Promise.reject(response);
        } else {
            return response.body.url;
        }
    }
}
