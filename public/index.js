import Router from './router/router.js';

(function () {
    const router = new Router(null, 'app', '/');

    fetch('./views/main_page/main_page.handlebars').then((val) => {
        val.text().then((val) => {
            // eslint-disable-next-line no-undef
            let mainTemplate = Handlebars.compile(val);
            var html = mainTemplate({ time: new Date().toTimeString() });

            const app = document.getElementById('app');
            app.innerHTML = html;
        });
    });

    fetch('./views/menu/menu.handlebars').then((val) => {
        val.text().then((val) => {
            // eslint-disable-next-line no-undef
            let menuTemplate = Handlebars.compile(val);
            var html = menuTemplate({
                menu_items: [
                    { link: '/profile', name: 'Профиль' },
                    { link: '/feed', name: 'Лента' },
                    { link: '/chat', name: '<p>Чат</p>' },
                ],
            });

            const menu = document.getElementById('menu');
            menu.innerHTML = html;

            const links = document.getElementsByTagName('a');

            for (let i = 0; i < links.length; i++) {
                links[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    router.goToRoute(links[i].getAttribute('href'));
                });
            }
        });
    });
})();
