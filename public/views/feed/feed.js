import precompiled_template from './feed.handlebars.js';

let LoadFeed = () => {
    // eslint-disable-next-line no-undef
    let mainTemplate = Handlebars.template(precompiled_template);
    var html = mainTemplate({ time: new Date().toTimeString() });

    return html;
};

export default LoadFeed;
