import { Component, VAttributes, createElement, renderElement } from '@t1d333/pickpinlib';
import RouterProvider from './router/reactrouter';
import { store } from './store/store';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [_: string]: VAttributes & { key?: string | number };
        }
    }
}
const sw = navigator.serviceWorker;

sw.register('/sw.js', { scope: '/' })
    .then((registration) => {
        console.log('SW registration OK:', registration.scope);
    })
    .catch((err) => {
        console.log('SW registration FAIL:', err);
    });

document.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();
});

document.addEventListener('click', (e: MouseEvent) => {
    if ((e!.target! as HTMLElement).tagName === 'A') {
        e.preventDefault();
        store.dispatch({
            type: 'navigate',
            payload: {
                page: (e!.target! as HTMLElement).getAttribute('href')!,
            },
        });
    }
});

type AppProps = {};
type AppState = {};

class App extends Component<AppProps, AppState> {
    render() {
        return <RouterProvider routes={{}} />;
    }
}

const root = document.getElementById('root');

const app = <App />;
root?.appendChild(renderElement(app));
