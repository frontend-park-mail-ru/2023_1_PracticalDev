import Feed from '../components/Feed/feed';
import Router from './router';
import Route from './route';
import { Component, VAttributes, createElement, renderElement, VNode } from '@t1d333/pickpinlib';
import { ProfileScreen } from '../components/ProfilePage/profile';
import { BoardScreen } from '../components/BoardPage/board';

type DisplayProps = { page: any };
type DisplayState = {};

class Display extends Component<DisplayProps, DisplayState> {
    render() {
        return <div>{this.props.page.render()}</div>;
    }
}

/**
 * Создает экземляр класса Router и снабжает его базовыми путями
 * @returns {Router}
 */
const InitRouter = (): Router => {
    const router = new Router({}, document.getElementById('app') as HTMLDivElement);

    router.Register('feed', {
        getComponent: () => {
            return <Feed />;
        },
    });

    router.Register('profile', {
        getComponent: () => {
            return <ProfileScreen />;
        },
    });

    router.Register('board', {
        getComponent: () => {
            return <BoardScreen />;
        },
    });
    router.Register('post', {
        render: () => {
            return <div>{'Кирилл лох'}</div>;
        },
    });

    return router;
};

export { InitRouter, Display };
