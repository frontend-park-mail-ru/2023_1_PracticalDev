const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

const noll = () => {};

class Ajax {
    /**Выполняет GET запрос
     *
     * @param {string} url
     * @param {boolean} json - определяет, будет ли ответ JSON объектом.
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async get(url, json = true) {
        const resp = await fetch(url, {
            method: AJAX_METHODS.GET,
            mode: 'cors',
            credentials: 'same-origin',
        });

        if (!resp.ok) {
            if (resp.status === 404) {
                return {
                    ok: false,
                    status: resp.status,
                    body: 'Err: Not found',
                };
            }
            return {
                ok: false,
                status: resp.status,
                body: 'Err without description',
            };
        }

        let data;
        if (json) {
            data = await resp.json();
        } else {
            data = await resp.text();
        }

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }

    /** Выполняет POST запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async post(url, body) {
        const resp = await fetch(url, {
            method: AJAX_METHODS.POST,
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(body),
        });

        if (!resp.ok) {
            if (resp.status === 404) {
                return {
                    ok: false,
                    status: resp.status,
                    body: 'Err: Not found',
                };
            }
            return {
                ok: false,
                status: resp.status,
                body: 'Err without description',
            };
        }

        const data = await resp.json();

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }

    /** Выполняет PUT запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async put(url, body) {
        const resp = await fetch(url, {
            method: AJAX_METHODS.PUT,
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(body),
        });

        if (!resp.ok) {
            if (resp.status === 404) {
                return {
                    ok: false,
                    status: resp.status,
                    body: 'Err: Not found',
                };
            }
            return {
                ok: false,
                status: resp.status,
                body: 'Err without description',
            };
        }

        const data = await resp.json();

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }

    /** Выполняет PATCH запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async put(url, body) {
        const resp = await fetch(url, {
            method: AJAX_METHODS.PUT,
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(body),
        });

        if (!resp.ok) {
            if (resp.status === 404) {
                return {
                    ok: false,
                    status: resp.status,
                    body: 'Err: Not found',
                };
            }
            return {
                ok: false,
                status: resp.status,
                body: 'Err without description',
            };
        }

        const data = await resp.json();

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }

    /** Выполняет DELETE запрос
     *
     * @param {string} url
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async delete(url) {
        const resp = await fetch(url, {
            method: AJAX_METHODS.DELETE,
            mode: 'cors',
            credentials: 'same-origin',
        });

        if (!resp.ok) {
            if (resp.status === 404) {
                return {
                    ok: false,
                    status: resp.status,
                    body: 'Err: Not found',
                };
            }
            return {
                ok: false,
                status: resp.status,
                body: 'Err without description',
            };
        }

        const data = await resp.json();

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }
}

export default Ajax;
