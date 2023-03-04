import InitRouter from './router/init.js';

(function () {
    const router = InitRouter();
    window.onload = router.OnWindowLoad();
})();
