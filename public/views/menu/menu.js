import precompiled_template from './menu.handlebars.js';

const LoadMenu = () => {
    // eslint-disable-next-line no-undef
    const menuTemplate = Handlebars.template(precompiled_template);
    const html = menuTemplate({
        menu_items: [
            { link: '/profile', name: 'Профиль' },
            { link: '/feed', name: 'Лента' },
            { link: '/chat', name: '<p>Чат</p>' },
            { link: '/posts/10', name: '<p>Пост!!!</p>' },
        ],
    });

    return html;
};

export default LoadMenu;
