import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { Pin } from '../../models/pin';
import { store } from '../../store/store';
import { IPin } from '../../models';
import { navigate } from '../../actions/navigation';

type PinCreationScreenState = {
    pin: IPin | undefined;
    errorMsg: string;
};

type PinChangingScreenProps = {};

export default class PinChangingScreen extends Component<PinChangingScreenProps, PinCreationScreenState> {
    constructor() {
        super();
        this.state = { pin: store.getState().changingPin, errorMsg: '' };
        if (!this.state.pin) {
            navigate('/profile');
        }
    }

    private unsubs: Function[] = [];
    private validate = (title: string, description: string): string => {
        if (title.trim() === '' || description.trim() === '') {
            return 'All fields must be filled';
        }
        if (title.length > 25) {
            return 'The maximum title length is 25 characters';
        }
        if (title.length > 50) {
            return 'The maximum description length is 50 characters';
        }
        return '';
    };

    private onErrorCallback = () => {
        if (store.getState().type !== 'pinChangingError') {
            return;
        }

        this.setState((s) => {
            return {
                ...s,
                errorMsg: store.getState().pinChangingErrorMsg,
            };
        });
    };

    private onDeleteCallback = () => {
        Pin.deletePin(this.state.pin?.id!).then(() => {
            navigate('/profile');
        });
    };

    private onSubmitCallback = () => {
        const form = document.querySelector('#pin-builder__form') as HTMLFormElement;
        const title = form.pinTitle.value as string;
        const description = form.description.value as string;
        const errMsg = this.validate(title, description);

        if (errMsg != '') {
            //TODO: добавить action
            store.dispatch({ type: 'pinChangingError', payload: { message: errMsg } });
            return;
        }

        Pin.updatePin({ ...this.state.pin!, title: title, description: description }).then((res) => {
            if (res.ok) {
                navigate('/profile');
            }
        });
    };

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    componentDidMount(): void {
        if (!this.state.pin) {
            const id = Number(location.href.split('/')[4]);
            Pin.getPin(id).then((pin) => {
                this.setState((s) => {
                    return { ...s, pin: pin };
                });
            });

            return;
        }

        this.unsubs.push(store.subscribe(this.onErrorCallback.bind(this)));
    }

    render() {
        return (
            <div>
                <Menu />
                <Header />
                <div id="app">
                    <div className="main__content">
                        <div className="pin-builder__container">
                            <form id="pin-builder__form" onsubmit={this.onSubmitCallback.bind(this)}>
                                <div className="pin-builder__img-container">
                                    <img src={this.state.pin?.media_source!} className="pin-builder__img" />
                                </div>
                                <div className="pin-builder__form-container">
                                    <h2 className="pin-builder__header">Change a pin</h2>
                                    <div className="pin-builder__inputs-container">
                                        <div className="pin-builder__error-msg-container">{this.state.errorMsg}</div>
                                        <input
                                            type="text"
                                            name="pinTitle"
                                            placeholder="Add name of the pin"
                                            className="input__custom"
                                            value={this.state.pin?.title!}
                                        />
                                        <textarea
                                            className="pin-builder__description-input"
                                            name="description"
                                            placeholder="Add a Pin Description"
                                            value={this.state.pin?.description!}
                                        />
                                    </div>
                                    <div className="pin-builder__btn-container">
                                        <div
                                            className="pin-builder__delete-btn "
                                            onclick={this.onDeleteCallback.bind(this)}
                                        >
                                            <span className="material-symbols-outlined md-24">delete</span>
                                        </div>
                                        <button type="submit" className="pin-builder__submit-btn">
                                            save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
