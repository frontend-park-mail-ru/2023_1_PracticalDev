import precompiled_template from './feed.handlebars.js';
import Ajax from '../../util/ajax.js';
import Pin from '../../components/pin/pin.js';

const LoadFeed = async () => {
    // eslint-disable-next-line no-undef
    const feedTemplate = Handlebars.template(precompiled_template);

    const response = await Ajax.get('/api/posts');
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('401');
        }
        throw new Error('500');
    }
    return feedTemplate({
        pins: response.body.map((pin) => {
            return new Pin(pin).getHtml();
        }),
    });
};

const AddFeedListeners = () => {
    document.getElementById('cors-btn').addEventListener('click', (e) => {
        Ajax.get('http://pickpin.ru:8080/ping', false).then((response) => {
            console.log(response);
        });
    });
};

export { LoadFeed, AddFeedListeners };
