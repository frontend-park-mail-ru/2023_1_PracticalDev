import { Component, createElement } from '@t1d333/pickpinlib';

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
}

export class Pin extends Component<PinProps, PinState> {
    private sizes = ['card_small', 'card_medium', 'card_large'];

    render() {
        return (
            <div
                key={'pin-' + this.props.pin.id}
                className={'card ' + this.sizes[Math.floor(Math.random() * this.sizes.length)]}
            >
                <div key={'pin-title'} className="pin__title">
                    {this.props.pin.title}
                </div>

                <div key={'pin-modal'} className="pin__modal">
                    <div key={'pin-head'} className="pin__modal-head"></div>

                    <div key={'pin-foot'} className="pin__modal-foot">
                        <button key="share_btn" className="pin__icon-btn material-symbols-outlined md-24">
                            share
                        </button>
                        <img
                            key="author_avatar"
                            src="https://forum.golangbridge.org/uploads/default/original/2X/0/03cbc1a9f9178055093eb0c25ba9df2c29611671.jpg"
                            alt=""
                            className="pin__author-avatar"
                        />
                        <button key="like_btn" className="pin__icon-btn material-symbols-outlined md-24">
                            favorite
                        </button>
                    </div>
                </div>
                <img key="pin_img" className="pin__image" src={this.props.pin.media_source} alt="abc" srcset="" />
            </div>
        );
    }
}
