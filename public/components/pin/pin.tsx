import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { IPin } from '../../models';

interface PinProps {
    pin: IPin;
}
interface PinState {}


class Pin extends Component<PinProps, PinState> {
    private sizes = ['card_small', 'card_medium', 'card_large'];

    render() {
        return (
            <div className={'card ' + this.sizes[Math.floor(Math.random() * this.sizes.length)]}>
                <div className="pin_title">{this.props.pin.title}</div>

                <div className="pin_modal">
                    <div className="modal_head">
                        <div className="save_card">Save</div>
                    </div>

                    <div className="modal_foot">
                        <button className="pin_icon_btn material-symbols-outlined md-24">share</button>
                        <img
                            src="https://forum.golangbridge.org/uploads/default/original/2X/0/03cbc1a9f9178055093eb0c25ba9df2c29611671.jpg"
                            alt=""
                            className="pin_author_avatar"
                        />
                        <button className="pin_icon_btn material-symbols-outlined md-24">more_horiz</button>
                    </div>
                </div>
                <img className="pin_image" src={'"' + this.props.pin.media_source + '"'} alt="abc" srcset="" />
            </div>
        );
    }
}

export default Pin;
