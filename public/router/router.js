// eslint-disable-next-line no-unused-vars
import Route from './route.js';

/**
 * Роутер для перехода по страницам без перезагрузки
 */
class Router {
    /** Объект для хранения маршрутов
     * @type {Object<string, Route>}
     */
    #routes;
    /** Корневой элемент, куда роутер будет загружать приложение
     * @type {HTMLDivElement}
     */
    #rootElem;
    /** Текущая открытая страница */
    #curPage;

    constructor(routes, rootElem, curPage) {
        this.#routes = routes;
        this.#rootElem = rootElem;
        this.#curPage = curPage;
    }

    /**
     *
     * @param {string} base_path базовый путь страницы
     * @param {Route} route маршрут, инкапсулированный в специальном классе
     */
    Register = (base_path, route) => {
        this.#routes[base_path] = route;
    };

    /** Выполняет переход на необходимую страницу
     *
     * @param {string} path - строка с адресом и параметрами
     */
    Navigate = (path = '') => {
        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        const route = this.#routes[decomposed_path[1]];

        if (!route) {
            this.RenderErrorPage(404);
            return;
        }

        try {
            const html = route.render_fn();
            this.#rootElem.innerHTML = html;
        } catch (error) {
            console.log(error);
            this.RenderErrorPage(500);
        }
    };

    /**
     * Отрисовывает страницу с ошибкой
     * @param {number} status
     */
    RenderErrorPage = (status) => {
        const error_route = this.#routes['error'];

        const html = error_route.render_fn(status);
        this.#rootElem.innerHTML = html;
    };

    /**
     * Отрисовывает страницу при изначальной загрузке
     */
    OnWindowLoad = () => {
        const path = location.href;
        let trimmed_path = '/' + path.split('/').slice(3).join('/');
        if (trimmed_path === '/') {
            trimmed_path = '/feed';
        }

        this.Navigate(trimmed_path);
    };
}

export default Router;
