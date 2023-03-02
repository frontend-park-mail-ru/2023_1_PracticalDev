let LoadPost = (template) => {
    // eslint-disable-next-line no-undef
    let mainTemplate = Handlebars.compile(template);
    let path = location.href;
    let decomposed_path = path.split('/').slice(3);
    if (decomposed_path.length != 2) {
        throw new Error('Wrong post path')
    }
    var html = mainTemplate({ id: decomposed_path[1]});

    return html;
};

export default LoadPost;
