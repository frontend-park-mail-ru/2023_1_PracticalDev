import { Component, createElement } from '@t1d333/pickpinlib';
import { Pin } from '../Pin/pin';
import { IPin } from '../../models';
import Ajax from '../../util/ajax';
import { store } from '../../store/store';
import './feed.css';

import './feed.css';

interface FeedProps {
    pins: IPin[];
}
interface FeedState {}

export default class Feed extends Component<FeedProps, FeedState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
    }

    componentDidMount(): void {}

    componentWillUnmount(): void {}

    returnHeight() {
        return document.getElementById('.pin_container')?.offsetHeight;
    }

    openPopup = function () {
        let popupBg = document.querySelector('.popup');
        popupBg?.classList.add('popup-active');
        let popup = document.querySelector('.popup__form');
        popup?.classList.add('popup__form-active');
    };

    closePopup = function () {
        let popupBg = document.querySelector('.popup');
        popupBg?.classList.remove('popup-active');
        let popup = document.querySelector('.popup__form');
        popup?.classList.remove('popup__form-active');
    };

    render() {
        return (
            <div className="feed_wrapper">
                <div className="pin_container" id="pin_container">
                    <div className="popup">
                        <form className="popup__form">
                            <div className="popup__form__text">link copied!</div>
                            <span className="popup__form__close-btn">
                                <a
                                    key="popup-close-btn"
                                    className="material-symbols-outlined popup__close-btn__icon md-32"
                                    onclick={this.closePopup.bind(this)}
                                >
                                    close
                                </a>
                            </span>
                        </form>
                    </div>
                    {...(this.props.pins || []).map((pin) => {
                        return <Pin pin={pin} />;
                    })}
                </div>
                <footer className="pin_container__footer" style="font-family:Inter; margin-bottom:30px; margin-top:20px; color:var(--color-dark);">PickPin, 2023</footer>
            </div>
        );
    }
}
