/**
 * Класс, хранящий в себе название пути и функцию для его отрисовки
 */
class Route {
    /** @type {string} Имя пути */
    name: string;
    /** @type {string} Заголовок пути для отображения в `title` вкладки */
    title: string;
    /** @type {Function} Функция отрисовки страницы */
    GetHtml: Function;
    /** @type {Function} Функция добавления обработчиков событий */
    AddListeners: Function;
    /** @type {boolean} Определяет, нужно ли отображать меню вместе с этой страницей */
    show_menu: boolean;

    /**
     * @constructor
     * @param {string} name Имя пути
     * @param {string} title Заголовок пути для отображения в `title` вкладки
     * @param {Function} GetHtml Функция отрисовки страницы
     * @param {Function} AddListeners Функция добавления обработчиков событий
     * @param {boolean}  show_menu Определяет, нужно ли отображать меню вместе с этой страницей
     */
    constructor(name: string, title: string, GetHtml: Function,AddListeners: Function, show_menu: boolean = true) {
        this.name = name;
        this.GetHtml = GetHtml;
        this.AddListeners = AddListeners;
        this.title = title;
        this.show_menu = show_menu;
    }
}

export default Route;
