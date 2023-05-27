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
import { SettingsScreen } from '../components/SettingsPage/settings';
import { SearchPage } from '../components/SearchPage/SearchPage';
import AuthChecker from '../components/AuthChecker/AuthChecker';
import { ChatList } from '../components/ChatList/ChatList';
import { ChatPage } from '../components/ChatPage/ChatPage';
import { FavoritePage } from '../components/FavoritePage/FavoritePage';

interface RouterProps {
    page: string;
}

interface RouterState {}

function resolve(path: string = ''): VNode {
    switch (path) {
        case 'feed':
            return (
                <AuthChecker authRequired={false}>
                    <MainScreen />
                </AuthChecker>
            );
        case 'profile':
            return (
                <AuthChecker authRequired={true}>
                    <ProfileScreen />
                </AuthChecker>
            );
        case 'board':
            return (
                <AuthChecker authRequired={true}>
                    <BoardScreen />
                </AuthChecker>
            );

        case 'board-changing':
            return (
                <AuthChecker authRequired={true}>
                    <BoardScreen />
                </AuthChecker>
            );

        case 'login':
            return <LoginScreen />;
        case 'signup':
            return <SignupScreen />;
        case 'pin-builder':
            return (
                <AuthChecker authRequired={true}>
                    <PinCreationScreen />
                </AuthChecker>
            );
        case 'pin-changing':
            return (
                <AuthChecker authRequired={true}>
                    <PinChangingScreen />
                </AuthChecker>
            );
        case 'pin':
            return (
                <AuthChecker authRequired={false}>
                    <PinScreen />
                </AuthChecker>
            );
        case 'settings':
            return (
                <AuthChecker authRequired={true}>
                    <SettingsScreen />
                </AuthChecker>
            );
        case 'search':
            return (
                <AuthChecker authRequired={true}>
                    <SearchPage />
                </AuthChecker>
            );
        case 'chats':
            return (
                <AuthChecker authRequired={true}>
                    <ChatList />
                </AuthChecker>
            );
        case 'favorite':
            return (
                <AuthChecker authRequired={true}>
                    <FavoritePage />
                </AuthChecker>
            );
        case 'chat':
            return (
                <AuthChecker authRequired={true}>
                    <ChatPage />
                </AuthChecker>
            );
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
            window.history.pushState({}, '', '/feed');
        }
        this.state = { page: location.href.split('/')[3] };
    }

    private Navigate() {
        if (store.getState().type !== 'navigate') {
            return;
        }
        const path = store.getState().page;

        if (path === this.state.page) {
            return;
        }

        if (store.getState().pushToState) {
            window.history.pushState('data', 'title', path);
        } else {
            store.dispatch({
                type: 'restoreState',
                payload: {
                    pushToState: true,
                },
            });
        }
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
                page: location.href.substring(location.href.indexOf('/', 15)),
            },
        });

        window.onpopstate = (event) => {
            store.dispatch({
                type: 'navigate',
                payload: {
                    page: location.href.substring(location.href.indexOf('/', 15)),
                    pushToState: false,
                },
            });
        };
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        return <Router page={this.state.page} />;
    }
}

export default RouterProvider;
