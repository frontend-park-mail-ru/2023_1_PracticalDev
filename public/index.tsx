import { Component, VAttributes, createElement, renderElement } from '@t1d333/pickpinlib';
import { InitRouter, Display } from './router/init';
import Feed from './views/feed/feed';
import Router from './router/reactrouter';
import RouterProvider from './router/reactrouter';

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
