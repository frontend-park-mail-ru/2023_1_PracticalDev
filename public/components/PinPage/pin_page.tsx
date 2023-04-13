import { Component, createElement } from '@t1d333/pickpinlib';

import { Header } from '../Header/header';
import Menu from '../Menu/menu';

type PinScreenProps = {};
type PinScreenState = {};

export class PinScreen extends Component<PinScreenProps, PinScreenState> {
    render() {
        return (
            <div key='wrapper'>
                <Menu key='menu' />
                <Header key='header' />
                <div key='app' id='app'>
                    <div key='main__content' className='main__content'>
                        <div className='pin-view'>
                            <img className='pin-view__image'
                                 src='/static/img/loginimg.jpg' alt='Pin image'>
                            </img>
                            <div className='pin-view__info'>
                                <div className='pin-view__actions'>
                                    <button
                                        className='pin-view__actions-more-btn material-symbols-outlined md-32'>
                                        more_horiz
                                    </button>
                                    <button
                                        className='pin-view__actions-share-btn material-symbols-outlined md-32'>
                                        share
                                    </button>
                                    <button
                                        className='pin-view__actions-like-btn material-symbols-outlined md-32'>
                                        favorite
                                    </button>
                                    <p className='pin-view__actions-stat'>1.2k</p>
                                    <button className='pin-view__actions-save-btn'>Save</button>
                                </div>
                                <p className='pin-view__title'>Улыбочку)</p>
                                <p className='pin-view__description'>#PickPin #фоточки #настроение #обои</p>
                                <div className='pin-view__author'>
                                    <div className='pin-view__author-avatar'>
                                        <img className='pin-view__author-avatar-img'
                                             src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images'
                                             alt='Pin author avatar'>
                                        </img>
                                    </div>
                                    <p className='pin-view__author-name'>Postperson</p>
                                    <button className='pin-view__author-subscribe-btn'>Subscribe</button>
                                </div>
                                <p className='pin-view__comments-header'>Comments</p>
                                <div className='pin-view__comments'></div>
                                <div className='pin-view__add-comment'>
                                    <div className='pin-view__add-comment-avatar'></div>
                                    <div className='pin-view__add-comment-input'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
