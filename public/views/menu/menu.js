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
            { link: '/feed', name: 'home' },
            { link: '/profile', name: 'dashboard' },
            { link: '/settings', name: 'settings' },
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
    const menuBox = document.querySelector('.menu__box');
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

    menuBox.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            menuBox.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
        }
    });
};

export { LoadMenu, AddMenuListeners };
