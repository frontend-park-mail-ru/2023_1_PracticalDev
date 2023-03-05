import InitRouter from './router/init.js';

(function () {
    const router = InitRouter();
    window.onload = router.OnWindowLoad();

    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            router.Navigate(e.target.getAttribute('href'));
        }
    });

    document.addEventListener('submit', (e) => {
        e.preventDefault();
    })
})();
