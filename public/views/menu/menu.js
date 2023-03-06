import Ajax from '../../util/ajax.js';
import precompiled_template from './menu.handlebars.js';

/**
 * Функция для построения компонента меню
 * @return {string} - html код компонента
 * */
const LoadMenu = () => {
    // eslint-disable-next-line no-undef
    const menuTemplate = Handlebars.template(precompiled_template);
    const html = menuTemplate({
        menu_items: [
            { link: '/profile', name: 'home' },
            { link: '/feed', name: 'dashboard' },
            { link: '/chat', name: 'settings' },
        ],
    });

    return html;
};

/**
 * Функция для добавления обратобчиков для компонента меню
 * */
const AddMenuListeners = () => {
    /** @type {HTMLButtonElement} */
    const logoutButton = document.getElementById('logout_btn');

    logoutButton.addEventListener('click', () => {
        Ajax.delete('/api/auth/logout').then((response) => {
            if (response.ok) {
                const redirect = new CustomEvent('navigate', {
                    bubbles: true,
                    detail: { link: '/login', user: response.body },
                });
                logoutButton.dispatchEvent(redirect);
            }
        });
    });
};

export { LoadMenu, AddMenuListeners };
