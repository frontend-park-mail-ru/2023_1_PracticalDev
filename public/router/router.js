class Router {
    #routes;
    #rootElem;
    #curPage;

    constructor(routes, rootElem, curPage) {
        this.#routes = routes;
        this.#rootElem = rootElem;
        this.#curPage = curPage;
    }

    goToRoute = (route) => {
        console.log(route);
        window.history.pushState('data', 'title', route);
    };
}

export default Router;
