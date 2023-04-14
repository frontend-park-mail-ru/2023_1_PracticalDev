// eslint-disable-next-line no-unused-vars
import { Component, VAttributes, createElement, renderElement } from '@t1d333/pickpinlib';
import Route from './route.js';

/**
 * Роутер для перехода по страницам без перезагрузки
 */
class Router {
    /** Объект для хранения маршрутов */
    #routes: { [s: string]: any };
    /** Корневой элемент, куда роутер будет загружать приложение */
    #rootElem: HTMLDivElement;
    /** Определяет, отображено ли сейчас меню на странице */
    #menuMounted: boolean = false;
    /** Сохраняет контекст при навигации */
    #context: Object = {};

    #prev_elem: HTMLElement | Text;

    constructor(routes: { [s: string]: any }, rootElem: HTMLDivElement) {
        this.#routes = routes;
        this.#rootElem = rootElem;
        this.#prev_elem = new Text('');
        this.#rootElem.appendChild(this.#prev_elem);
    }
    /**
     *
     * @param {string} base_path базовый путь страницы
     * @param {Route} route маршрут, инкапсулированный в специальном классе
     */
    public Register(base_path: string, route: any) {
        this.#routes[base_path] = route;
    }

    /** Выполняет переход на необходимую страницу
     *
     * @param {string} path - строка с адресом и параметрами
     */
    public Navigate(path: string = '') {
        this.#rootElem.removeChild(this.#prev_elem);
        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        const route = this.#routes[decomposed_path[1]];

        try {
            return route.getComponent;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Отрисовывает страницу при изначальной загрузке
     */
    public OnWindowLoad(): any {
        const path = location.href;
        let trimmed_path = '/' + path.split('/').slice(3).join('/');
        console.log(trimmed_path);
        if (trimmed_path === '/') {
            trimmed_path = '/feed';
        }

        this.Navigate(trimmed_path);
    }

    /**
     * Обработчик для события "navigate"
     * @param {CustomEventInit} e событие "navigate"
     */
   public OnNavigate(e: CustomEventInit): any {
        this.Navigate(e.detail.link);
        this.#context = e.detail;
    }
}

export default Router;
