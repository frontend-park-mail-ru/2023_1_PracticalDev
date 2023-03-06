import { LoadMenu, AddMenuListeners } from '../views/menu/menu.js';
import LoadHeader from '../views/header/header.js';
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
    /** Элемент, куда роутер будет загружать меню
     * @type {HTMLDivElement}
     */
    #menuElem;
    /** Элемент, куда роутер будет загружать header
     * @type {HTMLDivElement}
     */
    #headerElem;
    /** Определяет, отображено ли сейчас меню на странице */
    #menuMounted;
    /** Сохраняет контекст при навигации
     * @type {Object}
     */
    #context;

    constructor(routes, rootElem, menuElem, headerElem) {
        this.#routes = routes;
        this.#rootElem = rootElem;
        this.#menuElem = menuElem;
        this.#headerElem = headerElem;
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
    Navigate = async (path = '') => {
        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        const route = this.#routes[decomposed_path[1]];
        console.log(path);
        console.log(route);

        if (!route) {
            this.#MountMenu();
            this.RenderErrorPage(404);
            return;
        }

        try {
            const html = await route.GetHtml();
            this.#rootElem.innerHTML = html;
            route.AddListeners();
            if (route.show_menu && !this.#menuMounted) {
                this.#MountMenu();
            } else if (!route.show_menu) {
                this.#UnMountMenu();
            }
        } catch (error) {
            if (error.message === '401') {
                this.Navigate('/login');
            }
            console.log(error)
            this.RenderErrorPage(404);
        }
    };

    /**
     * Отрисовывает страницу с ошибкой
     * @param {number} status
     */
    RenderErrorPage = (status) => {
        const error_route = this.#routes['error'];

        const html = error_route.GetHtml(status);
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

        console.log(trimmed_path);
        this.Navigate(trimmed_path);
    };

    /**
     * Обработчик для события "navigate"
     * @param {CustomEvent} e событие "navigate"
     */
    OnNavigate = (e) => {
        e.preventDefault();
        this.Navigate(e.detail.link);
        if (e.detail != {}) {
            this.#context = e.detail;
        }
    };

    /**
     * Отображает меню
     */
    #MountMenu = () => {
        this.#menuMounted = true;
        this.#menuElem.innerHTML = LoadMenu();
        this.#headerElem.innerHTML = LoadHeader(this.#context);
        this.#rootElem.style.left = '100px';
        this.#rootElem.style.top = '80px';
        this.#rootElem.style.width = 'calc(100% - 100px)';

        AddMenuListeners();
    };

    /**
     * Скрывает меню
     */
    #UnMountMenu = () => {
        this.#menuMounted = false;
        this.#menuElem.innerHTML = '';
        this.#headerElem.innerHTML = '';
        this.#rootElem.style.left = '0px';
        this.#rootElem.style.width = '100%';
        this.#rootElem.style.top = 0;
    };
}

export default Router;
