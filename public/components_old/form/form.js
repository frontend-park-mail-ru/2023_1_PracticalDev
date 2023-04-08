import precompiled_template from './form.handlebars.js';

/** Класс Компонента Form */
class Form {
    #inputs;
    #method;
    #submitBtnText;
    #id;

    /**
     * Создает компонет Input
     * @constructor
     * @param {string} - submitTextBtn - текст кнопки отправки формы
     * @param {string} - method - метод формы
     * @param {Array<String>} - эелементы ввода для формы
     */
    constructor(submitBtnText, method, id, ...inputs) {
        this.#submitBtnText = submitBtnText;
        this.#inputs = inputs;
        this.#method = method;
        this.#id = id;
    }

    /**
     * Возвращет html код компанента
     * @return {string} - html код компонента
     */
    getHtml() {
        const tmpl = Handlebars.template(precompiled_template);
        return tmpl({
            submitBtnText: this.#submitBtnText,
            method: this.#method,
            inputs: this.#inputs,
            id: this.#id,
        });
    }
}

export default Form;
