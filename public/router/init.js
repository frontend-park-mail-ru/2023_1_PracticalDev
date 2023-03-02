import LoadFeed from '../views/feed/feed.js';
import LoadPost from '../views/posts/posts.js';
import Router from './router.js';
import Route from './route.js';
import LoadErrorPage from '../views/error/error.js';

/**
 * Создает экземляр класса Router и снабжает его базовыми путями
 * @returns {Router}
 */
let InitRouter = () => {
    const router = new Router({}, document.getElementById('app'), '/');

    router.Register('feed', new Route('feed', 'Лента', LoadFeed));
    router.Register('posts', new Route('post', 'Пост', LoadPost));
    router.Register('error', new Route('error', 'Ошибка', LoadErrorPage));

    return router;
};

export default InitRouter;
