let LoadFeed = (template) => {
    // eslint-disable-next-line no-undef
    let mainTemplate = Handlebars.compile(template);
    var html = mainTemplate({ time: new Date().toTimeString() });

    return html;
};

export default LoadFeed;
