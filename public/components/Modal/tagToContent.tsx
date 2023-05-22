import { createElement } from '@t1d333/pickpinlib';
import { BoardBuilder } from '../BoardBuilder/BoardBuilder';
import PinCreationScreen from '../PinCreationPage/PinCreationPage';
import { ActionList } from '../ActionList/ActionList';

export const tagToContent = (tag: string) => {
    switch (tag) {
        case 'board-builder':
            return <BoardBuilder />;
        case 'action-list':
            return <ActionList />;
        default:
            return <div></div>;
    }
};
