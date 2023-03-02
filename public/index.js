import InitRouter from './router/init.js';

(function () {
    const router = InitRouter();
    window.onload = router.OnWindowLoad();

    fetch('/views/menu/menu.handlebars').then((val) => {
        val.text().then((val) => {
            // eslint-disable-next-line no-undef
            let menuTemplate = Handlebars.compile(val);
            var html = menuTemplate({
                menu_items: [
                    { link: '/profile', name: 'Профиль' },
                    { link: '/feed', name: 'Лента' },
                    { link: '/chat', name: '<p>Чат</p>' },
                    { link: '/posts/10', name: '<p>Пост!!!</p>' },
                ],
            });

            const menu = document.getElementById('menu');
            menu.innerHTML = html;

            document.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    e.preventDefault();
                    router.Navigate(e.target.getAttribute('href'));
                }
            });
        });
    });
})();
