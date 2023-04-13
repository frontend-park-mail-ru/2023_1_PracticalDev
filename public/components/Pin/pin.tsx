import { Component, createElement } from '@t1d333/pickpinlib';
import { navigate } from '../../actions/navigation';
import { store } from '../../store/store';
import { Pin as PinModel } from '../../models/pin';

export interface IPin {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    media_source: string;
    author_id: number;
}

interface PinState {}

interface PinProps {
    pin: IPin;
    page: string;
}

export class Pin extends Component<PinProps, PinState> {
    private sizes = ['card_small', 'card_medium', 'card_large'];
    private onClick = (e: MouseEvent) => {
        switch (e.target.tagName) {
            case 'DIV':
                store.dispatch({ type: 'pinView', payload: { pin: this.props.pin } });
                navigate(`/pin/${this.props.pin.id}`);
                break;
            case 'BUTTON':
                break;
            default:
                break;
        }
    };

    private onChangePin = (e: MouseEvent) => {
        store.dispatch({ type: 'pinChanging', payload: { changingPin: this.props.pin } });
        navigate('/pin-changing');
    };
    render() {
        return (
            <div
                key={'pin-' + this.props.pin.id}
                className={'card ' + this.sizes[Math.floor(Math.random() * this.sizes.length)]}
                onclick={this.onClick.bind(this)}
            >
                <div key={'pin-title'} className="pin__title">
                    {this.props.pin.title}
                </div>

                <div key={'pin-modal'} className="pin__modal">
                    <div key={'pin-head'} className="pin__modal-head"></div>

                    <div key={'pin-foot'} className="pin__modal-foot">
                        <button
                            key="share_btn"
                            className="pin__icon-btn material-symbols-outlined md-24"
                            href="/pin-changing"
                        >
                            share
                        </button>
                        <img
                            key="author_avatar"
                            src="https://forum.golangbridge.org/uploads/default/original/2X/0/03cbc1a9f9178055093eb0c25ba9df2c29611671.jpg"
                            alt=""
                            className="pin__author-avatar"
                        />
                        {store.getState().page === '/profile' ? (
                            <button
                                key="change_btn"
                                onclick={this.onChangePin.bind(this)}
                                className="pin__icon-btn material-symbols-outlined md-24"
                            >
                                edit
                            </button>
                        ) : (
                            <button key="like_btn" className="pin__icon-btn material-symbols-outlined md-24">
                                favorite
                            </button>
                        )}
                    </div>
                </div>
                <img key="pin_img" className="pin__image" src={this.props.pin.media_source} alt="abc" srcset="" />
            </div>
        );
    }
}
