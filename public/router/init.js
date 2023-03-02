import LoadFeed from '../views/feed/feed.js';
import LoadPost from '../views/posts/posts.js';
import Router from './router.js';
import Route from './route.js';
import LoadErrorPage from '../views/error/error.js';

let InitRouter = () => {
    const router = new Router(null, document.getElementById('app'), '/');

    router.Register('feed', new Route('feed', 'Лента', '/views/feed/feed.handlebars', LoadFeed));
    router.Register('posts', new Route('post', 'Пост', '/views/posts/posts.handlebars', LoadPost));
    router.Register('error', new Route('error', 'Ошибка', '/views/error/error.handlebars', LoadErrorPage));

    return router;
};

export default InitRouter;
