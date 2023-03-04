/**
 * Класс, хранящий в себе название пути и функцию для его отрисовки
 */
class Route {
    name;
    title;
    render_fn;
    show_menu;

    /**
     * 
     * @param {string} name Имя пути
     * @param {string} title Заголовок пути для отображения в `title` вкладки
     * @param {Function} render_fn Функция отрисовки страницы
     * @param {boolean}  show_menu Определяет, нужно ли отображать меню вместе с этой страницей
     */
    constructor(name, title, render_fn, show_menu = true) {
        this.name = name;
        this.render_fn = render_fn;
        this.title = title;
        this.show_menu = show_menu;
    }
}

export default Route;
