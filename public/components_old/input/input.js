import precompiled_template from './input.handlebars.js';

/**Компонент ввода данных */
class Input {
    #placeholder;
    #name;
    #icon;
    #type;

    /**
     * Создает компонет Input
     * @constructor
     * @param {string} - placeholder - заголоовок пина
     * @param {string} - name - имя элемента input
     * @param {string} - type - тип элемента input
     * @param {string} - имя иконки для input
     */
    constructor(placeholder, name, type, icon = '') {
        this.#name = name;
        this.#placeholder = placeholder;
        this.#type = type;
        this.#icon = icon;
    }

    /**
     * Возвращет html код компанента
     * @return {string} - html код компонента
     */
    getHtml = () => {
        const tmpl = Handlebars.template(precompiled_template);
        return tmpl({
            name: this.#name,
            placeholder: this.#placeholder,
            type: this.#type,
            icon: this.#icon,
        });
    };
}

export default Input;
