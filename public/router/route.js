/**
 * Класс, хранящий в себе название пути и функцию для его отрисовки
 */
class Route {
    name;
    title;
    render_fn;

    /**
     * 
     * @param {string} name Имя пути
     * @param {string} title Заголовок пути для отображения в `title` вкладки
     * @param {Function} render_fn Функция отрисовки страницы
     */
    constructor(name, title, render_fn) {
        this.name = name;
        this.render_fn = render_fn;
        this.title = title;
    }
}

export default Route;
