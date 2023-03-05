import LoadFeed from '../views/feed/feed.js';
import LoadPost from '../views/posts/posts.js';
import LoadLogin from '../views/login/login.js';
import LoadSignup from '../views/register/register.js';
import Router from './router.js';
import Route from './route.js';

import LoadErrorPage from '../views/error/error.js';

/**
 * Создает экземляр класса Router и снабжает его базовыми путями
 * @returns {Router}
 */
let InitRouter = () => {
    const router = new Router({}, document.getElementById('app'), document.getElementById('menu'), document.getElementById('header_wrapper'));

    router.Register('feed', new Route('feed', 'Лента', LoadFeed));
    router.Register('posts', new Route('post', 'Пост', LoadPost));
    router.Register('error', new Route('error', 'Ошибка', LoadErrorPage));
    router.Register('login', new Route('login', 'Вход', LoadLogin, false));
    router.Register('signup', new Route('signup', 'Регистрация', LoadSignup, false));
    
    return router;
};

export default InitRouter;
