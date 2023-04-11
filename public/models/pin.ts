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

    //
    // static updatePin(pin :IPin) {
    //     return Ajax.put(`/pins/${pin.id}`, pin)
    // }

    static deletePin(id: number) {
        return Ajax.get(`/api/pins/${id}`).then((res) => {
            if (res.status !== 200) {
                Promise.reject(res);
            }
        });
    }

    static getFeed() {
        return Ajax.get('/api/pins').then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            } else {
                console.log(response.body.pins);
                return response.body.pins;
            }
        });
    }
}
