import { Component, VNode, createElement, renderElement } from '@t1d333/pickpinlib';
import { MainScreen } from '../components/MainPage/main';
import { LoginScreen } from '../components/LoginPage/login';
import { SignupScreen } from '../components/SignupPage/signup';
import { ProfileScreen } from '../components/ProfilePage/profile';
import { BoardScreen } from '../components/BoardPage/board';
import { store } from '../store/store';

interface RouterProps {
    page: string;
}

interface RouterState {}

function resolve(path: string = ''): VNode {
    switch (path) {
        case 'feed':
            return <MainScreen key="main" />;
        case 'profile':
            return <ProfileScreen key="ProfileScreen" />;
        case 'board':
            return <BoardScreen name="Testboard" />;
        case 'login':
            return <LoginScreen key="login" />;
        case 'signup':
            return <SignupScreen key="signup" />;
        case 'post':
            return <div key="foo1">{'Kirill loh'}</div>;
        default:
            return <div></div>;
    }
}

class Router extends Component<RouterProps, RouterState> {
    private routes: { [s: string]: VNode } = {};

    navigate(path: string = '') {
        return resolve(path);
    }

    render() {
        return this.navigate(this.props.page);
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
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        if (!window.location.href.match(/(.+\w\/)(.+)/)) {
            window.history.pushState('data', 'title', '/feed');
        }
        this.state = { page: window.location.href.replace(/(.+\w\/)(.+)/, '/$2').split('/')[1] };
    }

    private Navigate() {
        const path = store.getState().page;
        if (path === this.state.page) {
            return;
        }

        console.log('ghe')

        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        this.setState((s: RouterProviderState) => {
            return {
                page: decomposed_path[1],
            };
        });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.Navigate.bind(this)));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun()
        })
    }

    render() {
        return <Router key="router" page={this.state.page} />;
    }
}

export default RouterProvider;
