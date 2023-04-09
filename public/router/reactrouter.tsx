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
        console.log(path)
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

    private Navigate() {
        let path = store.getState().page;

        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        console.log(decomposed_path[1]);
        this.setState((s: RouterProviderState) => {
            return {
                page: decomposed_path[1],
            };
        });
    }

    componentDidUpdate(): void {
        console.log(this.state)
    }

    componentDidMount(): void {
        store.subscribe(this.Navigate.bind(this));

        let path = window.location.href.replace(/(.+\w\/)(.+)/, '/$2').split('/');
        this.setState((s: RouterProviderState) => {
            return {
                page: path[1],
            };
        });
    }

    render() {
        return <Router key="router" page={this.state.page} />;
    }
}

export default RouterProvider;
