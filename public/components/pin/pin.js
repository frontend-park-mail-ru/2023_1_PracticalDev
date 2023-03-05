import precompiled_template from './pin.handlebars.js';

class Pin {
    #title;
    #mediaSrc;
    #size;

    constructor({ title, mediaSrc }) {
        this.#mediaSrc = mediaSrc;
        this.#title = title;

        const sizes = ['card_small', 'card_medium', 'card_large'];
        this.#size = sizes[Math.floor(Math.random() * sizes.length)];
    }

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
