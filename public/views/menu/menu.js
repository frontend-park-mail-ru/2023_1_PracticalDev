import precompiled_template from './menu.handlebars.js';

const LoadMenu = () => {
    // eslint-disable-next-line no-undef
    const menuTemplate = Handlebars.template(precompiled_template);
    const html = menuTemplate({
        menu_items: [
            { link: '/profile', name: 'home' },
            { link: '/feed', name: 'dashboard' },
            { link: '/chat', name: 'settings' },
            //{ link: '/posts/10', name: '<p>Пост!!!</p>' },
        ],
    });

    return html;
};

export default LoadMenu;
