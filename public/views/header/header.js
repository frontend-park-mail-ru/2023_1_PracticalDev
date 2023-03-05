import precompiled_template from './header.handlebars.js';
import Input from '../../components/input/input.js';
const LoadHeader = () => {
    // eslint-disable-next-line no-undef
    const headerTemplate = Handlebars.template(precompiled_template);
    const searchInput = new Input("Search", "search", "text");
    const html = headerTemplate({input: searchInput.getHtml()});

    return html;
};

export default LoadHeader;
