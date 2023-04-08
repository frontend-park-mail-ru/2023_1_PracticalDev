import { Component, VNode, createElement, renderElement } from '@t1d333/pickpinlib';
import Feed from '../components/Feed/feed';
import Menu from '../components/Menu/menu';
import { MainScreen } from '../components/MainPage/main';
import { Header } from '../components/Header/header';

interface RouterProps {
    page: string;
}

interface RouterState {}

function resolve(path: string = ''): VNode {
    switch (path) {
        case 'feed':
            return <MainScreen key="mainscreen" />;

        case 'post':
            return <div key="foo1">{'Kirill loh'}</div>;
        default:
            return <div></div>;
    }
}

class Router extends Component<RouterProps, RouterState> {
    private routes: { [s: string]: VNode } = {};

    navigate(path: string = '') {
        console.log(path);
        return resolve(path);
    }

    render() {
        return <div key="route">{this.navigate(this.props.page)}</div>;
    }
}

interface Route {
    path: string;
    element: VNode;
}

interface RouterProviderProps {
    routes: Route[];
}

interface RouterProviderState {
    page: string;
}

class RouterProvider extends Component<RouterProviderProps, RouterProviderState> {
    constructor() {
        super();
        this.state = { page: 'feed' };
    }

    private OnNavigate(e: CustomEventInit): any {
        let path = e.detail.link;
        console.log(path);

        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        this.setState((s: RouterProviderState) => {
            return {
                page: decomposed_path[1],
            };
        });
        // this.#context = e.detail;
    }

    private preventAnchor(e: MouseEvent): any {
        if ((e!.target! as HTMLElement).tagName === 'A') {
            e.preventDefault();
            const redirect = new CustomEvent('navigate', {
                bubbles: true,
                detail: { link: (e!.target! as HTMLElement).getAttribute('href')! },
            });
            const div = document.getElementById('app') as HTMLDivElement;
            div.dispatchEvent(redirect);
        }
    }

    componentDidMount(): void {
        document.addEventListener('navigate', this.OnNavigate.bind(this));
        document.addEventListener('click', this.preventAnchor.bind(this));
    }

    render() {
        return <Router key="router" page={this.state.page} />;
    }
}

export default RouterProvider;
