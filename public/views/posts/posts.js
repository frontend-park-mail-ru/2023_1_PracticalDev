import precompiled_template from './posts.handlebars.js';

let LoadPost = () => {
    // eslint-disable-next-line no-undef
    let mainTemplate = Handlebars.template(precompiled_template);
    let path = location.href;
    let decomposed_path = path.split('/').slice(3);
    if (decomposed_path.length != 2) {
        throw new Error('Wrong post path');
    }
    var html = mainTemplate({ id: decomposed_path[1] });

    return html;
};

export default LoadPost;
