import { createElement } from '@t1d333/pickpinlib';
import { BoardBuilder } from '../BoardBuilder/BoardBuilder';
import { ActionList } from '../ActionList/ActionList';
import { LoginModal } from '../LoginModal/LoginModal';

export const tagToContent = (tag: string) => {
    switch (tag) {
        case 'board-builder':
            return <BoardBuilder />;
        case 'action-list':
            return <ActionList />;
        case 'login':
            return <LoginModal />;
        default:
            return <div></div>;
    }
};
