/**
 * Хеш-таблица, возвращающая название и описание ошибки по коду
 *
 * @type {Map<int, {title: string, description: string}}
 */
let errors = new Map([
    [
        404, {
            title: 'Ошибка 404',
            description: 'Страница не найдена',
        },
    ],
]);

/**
 * Подставляет название и описание ошибки в шаблон и возращает `html` код для вставки
 * @param {string} template
 * @param {number} code
 * 
 * @returns {string}
 */
let LoadErrorPage = (template, code) => {
    let mainTemplate = Handlebars.compile(template);
    let error = errors.get(code);
    var html = mainTemplate({ title: error.title, description: error.description });

    return html;
};

export default LoadErrorPage;
