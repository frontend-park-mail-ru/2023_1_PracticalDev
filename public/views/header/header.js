import precompiled_template from './header.handlebars.js';
import Input from '../../components/input/input.js';
import Ajax from '../../util/ajax.js';

/**
 * @param {Object} context
 * @returns
 */
const LoadHeader = async (context) => {
    // eslint-disable-next-line no-undef
    const headerTemplate = Handlebars.template(precompiled_template);
    const searchInput = new Input('Search', 'search', 'text');
    if (!context) {
        const response = await Ajax.get('/api/auth/me');
        if (response.ok) {
            console.log(headerTemplate({ input: searchInput.getHtml(), username: response.body.username }))
            return headerTemplate({ input: searchInput.getHtml(), username: response.body.username });
        }
    }
    return headerTemplate({ input: searchInput.getHtml(), username: context ? context.user.username : '' });
};

export default LoadHeader;
