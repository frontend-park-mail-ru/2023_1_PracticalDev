import precompiled_template from './posts.handlebars.js';

const LoadPost = () => {
    // eslint-disable-next-line no-undef
    const mainTemplate = Handlebars.template(precompiled_template);
    const path = location.href;
    const decomposed_path = path.split('/').slice(3);
    if (decomposed_path.length != 2) {
        throw new Error('Wrong post path');
    }
    const html = mainTemplate({ id: decomposed_path[1] });

    return html;
};

export default LoadPost;
