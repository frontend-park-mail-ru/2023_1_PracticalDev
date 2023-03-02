import precompiled_template from "./error.handlebars.js";

/**
 * Объект, хранящий название и описание ошибки по коду
 *
 * @type {Object<number, {title: string, description: string}}
 */
const errors = {
    404: {
        title: 'Ошибка 404',
        description: 'Страница не найдена',
    },
    500: {
        title: 'Ошибка 500',
        description: 'Произошла внутренняя ошибка',
    },
};

/**
 * Подставляет название и описание ошибки в шаблон и возращает `html` код для вставки
 * @param {string} template
 * @param {number} code
 *
 * @returns {string}
 */
let LoadErrorPage = (code) => {
    // eslint-disable-next-line no-undef
    let mainTemplate = Handlebars.template(precompiled_template);
    let error = errors[code];
    var html = mainTemplate({ title: error.title, description: error.description });

    return html;
};

export default LoadErrorPage;
