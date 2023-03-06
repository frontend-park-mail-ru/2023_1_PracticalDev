/**
 * Класс, хранящий в себе название пути и функцию для его отрисовки
 */
class Route {
    /** @type {string} Имя пути */
    name;
    /** @type {string} Заголовок пути для отображения в `title` вкладки */
    title;
    /** @type {Function} Функция отрисовки страницы */
    GetHtml;
    /** @type {Function} Функция добавления обработчиков событий */
    AddListeners;
    /** @type {boolean} Определяет, нужно ли отображать меню вместе с этой страницей */
    show_menu;

    /**
     * @constructor
     * @param {string} name Имя пути
     * @param {string} title Заголовок пути для отображения в `title` вкладки
     * @param {Function} GetHtml Функция отрисовки страницы
     * @param {Function} AddListeners Функция добавления обработчиков событий
     * @param {boolean}  show_menu Определяет, нужно ли отображать меню вместе с этой страницей
     */
    constructor(name, title, GetHtml,AddListeners, show_menu = true) {
        this.name = name;
        this.GetHtml = GetHtml;
        this.AddListeners = AddListeners;
        this.title = title;
        this.show_menu = show_menu;
    }
}

export default Route;
