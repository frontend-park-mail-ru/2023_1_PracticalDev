/**
 * @module Ajax Модуль для асинхронного взаимодействия с сестью
 */
const AJAX_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
};

class Ajax {
    static async #fetch(url: string, options = {}, parseResponse = true) {
        const resp = await fetch(url, {
            ...options,
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

        let data = parseResponse ? (resp.status !== 204 ? await resp.json() : '') : await resp.text();

        return {
            ok: true,
            status: resp.status,
            body: data,
        };
    }

    /**Выполняет GET запрос
     *
     * @param {string} url
     * @param {boolean} json - определяет, будет ли ответ JSON объектом.
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async get(
        url: string,
        json: boolean = true,
    ): Promise<{ status: number; body: { [_: string]: any }; ok: boolean }> {
        return this.#fetch(
            url,
            {
                method: AJAX_METHODS.GET,
                mode: 'cors',
                credentials: 'same-origin',
            },
            json,
        );
    }

    /** Выполняет POST запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async post(url: string, body: object): Promise<{ status: number; body: { [_: string]: any }; ok: boolean }> {
        return this.#fetch(url, {
            method: AJAX_METHODS.POST,
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(body),
        });
    }

    /** Выполняет PUT запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async put(url: string, body: object): Promise<{ status: number; body: { [_: string]: any }; ok: boolean }> {
        return this.#fetch(url, {
            method: AJAX_METHODS.PUT,
            mode: 'cors',
            credentials: 'same-origin',
            body: body,
        });
    }

    /** Выполняет PATCH запрос
     *
     * @param {string} url
     * @param {Object} body
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async patch(
        url: string,
        body: object,
    ): Promise<{ status: number; body: { [_: string]: any }; ok: boolean }> {
        return this.#fetch(url, {
            method: AJAX_METHODS.PATCH,
            mode: 'cors',
            credentials: 'same-origin',
            body: body,
        });
    }

    /** Выполняет DELETE запрос
     *
     * @param {string} url
     *
     * @returns {Promise<{status: number, body: Object, ok: boolean}>}
     */
    static async delete(url: string): Promise<{ status: number; body: { [_: string]: any }; ok: boolean }> {
        return this.#fetch(url, {
            method: AJAX_METHODS.DELETE,
            mode: 'cors',
            credentials: 'same-origin',
        });
    }
}

export default Ajax;
