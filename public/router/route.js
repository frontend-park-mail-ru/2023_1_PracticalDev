/**
 * Класс, хранящий в себе название пути и функцию для его отрисовки
 */
class Route {
    name;
    title;
    GetHtml;
    AddListeners;
    show_menu;

    /**
     * 
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
