import { Component, VAttributes, createElement, renderElement } from '@t1d333/pickpinlib';
import { InitRouter, Display } from './router/init';
import RouterProvider from './router/reactrouter';
import { store } from './store/store';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [_: string]: VAttributes & { key?: string | number };
        }
    }
}

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
    componentDidMount(): void {}
    render() {
        return <RouterProvider routes={{}} key="routerprovider" />;
    }
}

const root = document.getElementById('root');

const app = <App />;
root?.appendChild(renderElement(app));
