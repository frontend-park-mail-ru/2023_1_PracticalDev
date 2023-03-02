import Ajax from '../util/ajax.js';
// eslint-disable-next-line no-unused-vars
import Route from './route.js';

/**
 * Роутер для перехода по страницам без перезагрузки
 */
class Router {
    /** Хеш-таблица для хранения маршрутов
     * @type {Map<string, Route>}
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
        this.#routes = new Map();
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
        let decomposed_path = path.split('/');
        let route = this.#routes[decomposed_path[1]];

        if (!route) {
            this.RenderErrorPage(404);
            return;
        }

        Ajax.get(route.template, false).then((response) => {
            if (!response.ok) {
                this.RenderErrorPage(response.status);
                return;
            }

            let html = route.render_fn(response.body);
            this.#rootElem.innerHTML = html;
        });
    };

    /**
     * Отрисовывает страницу с ошибкой
     * @param {number} status
     */
    RenderErrorPage = (status) => {
        let error_route = this.#routes['error'];

        Ajax.get(error_route.template, false).then((response) => {
            let html = error_route.render_fn(response.body, status);
            this.#rootElem.innerHTML = html;
        });
    };

    OnWindowLoad = () => {
        let path = location.href;
        let trimmed_path = '/' + path.split('/').slice(3).join('/');
        if (trimmed_path === '/') {
            trimmed_path = '/feed';
        }

        this.Navigate(trimmed_path);
    };
}

export default Router;
