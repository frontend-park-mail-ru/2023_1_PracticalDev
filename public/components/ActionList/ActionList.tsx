import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import { hideModal, showModal } from '../../actions/modal';
import './ActionList.css';

export class ActionList extends Component<{}, {}> {
    render() {
        return (
            <span className={`action-list`}>
                <span
                    className="action"
                    onclick={() => {
                        hideModal();
                        navigate('/pin-builder');
                    }}
                >
                    Create pin
                </span>
                <span
                    className="action"
                    onclick={() => {
                        showModal('board-builder');
                    }}
                >
                    Create board
                </span>
            </span>
        );
    }
}
