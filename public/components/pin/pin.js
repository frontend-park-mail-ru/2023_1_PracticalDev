import precompiled_template from './pin.handlebars.js';

/** Компонент пина в ленте */
class Pin {
    #title;
    #mediaSrc;
    #size;

    /**
     * Создает компонет Pin
     * @constructor
     * @param {string} - title - заголоовок пина
     * @param {string} - media_source - ссылка на медиа
     */
    constructor({ title, media_source }) {
        this.#mediaSrc = media_source;
        this.#title = title;

        const sizes = ['card_small', 'card_medium', 'card_large'];
        this.#size = sizes[Math.floor(Math.random() * sizes.length)];
    }

    /**
     * Возвращет html код компанента
     * @return {string} - html код компонента
     */
    getHtml = () => {
        const tmpl = Handlebars.template(precompiled_template);
        return tmpl({
            title: this.#title,
            mediaSrc: this.#mediaSrc,
            cardSize: this.#size,
        });
    };
}

export default Pin;
