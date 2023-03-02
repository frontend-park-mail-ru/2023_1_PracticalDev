import precompiled_template from './feed.handlebars.js';

const LoadFeed = () => {
    // eslint-disable-next-line no-undef
    const mainTemplate = Handlebars.template(precompiled_template);
    const html = mainTemplate({ time: new Date().toTimeString() });

    return html;
};

export default LoadFeed;
