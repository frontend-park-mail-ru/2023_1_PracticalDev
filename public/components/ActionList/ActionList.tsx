import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import { hideModal, showModal } from '../../actions/modal';
import './ActionList.css';
import { store } from '../../store/store';

export class ActionList extends Component<{}, {}> {
    render() {
        return (
            <span className={`action-list`}>
                <span
                    className="action"
                    onclick={() => {
                        if (store.getState().user) {
                            navigate('/pin-builder');
                            return;
                        }
                        showModal('login');
                    }}
                >
                    Create pin
                </span>
                <span
                    className="action"
                    onclick={() => {
                        showModal(store.getState().user ? 'board-builder' : 'login');
                    }}
                >
                    Create board
                </span>
            </span>
        );
    }
}
