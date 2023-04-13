import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import { MainScreen } from '../components/MainPage/main';
import { LoginScreen } from '../components/LoginPage/login';
import { SignupScreen } from '../components/SignupPage/signup';
import { ProfileScreen } from '../components/ProfilePage/profile';
import { BoardScreen } from '../components/BoardPage/board';
import { PinScreen } from '../components/PinPage/pin_page';
import { store } from '../store/store';
import PinCreationScreen from '../components/PinCreationPage/PinCreationPage';
import PinChangingScreen from '../components/PinChangingPage/PinChangingPage';

interface RouterProps {
    page: string;
}

interface RouterState {}

function resolve(path: string = ''): VNode {
    console.log(path);
    switch (path) {
        case 'feed':
            return <MainScreen key="main" />;
        case 'profile':
            return <ProfileScreen key="profilescreen" />;
        case 'board':
            return <BoardScreen name="board" />;
        case 'login':
            return <LoginScreen key="login" />;
        case 'signup':
            return <SignupScreen key="signup" />;
        case 'pin-builder':
            return <PinCreationScreen key="pin-creation" />;
        case 'pin-changing':
            return <PinChangingScreen key="pin-changing" />;
        case 'settings':
            return <div>{'Comming soon...'}</div>;
        case 'pin':
            return <PinScreen key="pin" />;
        default:
            return <div>404</div>;
    }
}

class Router extends Component<RouterProps, RouterState> {
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
        this.state = { page: location.href.split('/')[3] };
    }

    private Navigate() {
        if (store.getState().type !== 'navigate') {
            return;
        }
        const path = store.getState().page;

        console.log(path);
        if (path === this.state.page) {
            return;
        }

        window.history.pushState('data', 'title', path);
        const decomposed_path = path.split('/');
        this.setState((_: RouterProviderState) => {
            return {
                page: decomposed_path[1],
            };
        });
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.Navigate.bind(this)));
        store.dispatch({
            type: 'navigate',
            payload: {
                page: location.href.substring(16)
            }
        })
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        return <Router key="router" page={this.state.page} />;
    }
}

export default RouterProvider;
