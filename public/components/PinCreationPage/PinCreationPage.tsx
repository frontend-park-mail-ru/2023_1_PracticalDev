import { Component, VNode, createElement } from '@t1d333/pickpinlib';
import { Header } from '../Header/header';
import Menu from '../Menu/menu';
import { Input } from '../Input/input';
import Pin from '../../models/pin';
import { store } from '../../store/store';

type PinCreationScreenState = {
    name: string;
    description: string;
    errorMsg: string;
    imgUrl: string | undefined;
};

export default class PinCreationScreen extends Component<{}, PinCreationScreenState> {
    constructor() {
        super();
        this.state = { name: '', description: '', errorMsg: '', imgUrl: undefined };
    }
    private unsubs: Function[] = [];
    private validate = (title: string, description: string, fl: FileList | null): string => {
        if (title.trim() === '' || description.trim() === '') {
            return 'All fields must be filled';
        }
        if (title.length > 100) {
            return 'The maximum title length is 100 characters';
        }

        if (!fl || fl.length !== 1) return 'Select image';
        return '';
    };

    private onErrorCallback = () => {
        if (store.getState().type !== 'pinCreationError') {
            return;
        }

        this.setState((s) => {
            return {
                ...s,
                errorMsg: store.getState().pinCreationErrorMsg,
            };
        });
    };

    private onSubmitCallback = () => {
        const form = document.querySelector('.pin-builder__form') as HTMLFormElement;
        const imgInput = document.getElementById('pin-image') as HTMLInputElement;
        const fd = new FormData();
        const errMsg = this.validate(form.pinTitle.value, form.pinDescription.value, imgInput.files);
        if (errMsg != '') {
            //TODO: добавить action
            store.dispatch({ type: 'pinCreationError', payload: { message: errMsg } });
            return;
        }

        imgInput.files?.length;
        fd.append('title', form.pinTitle.value);
        fd.append('description', form.pinDescription.value);
        fd.append('bytes', imgInput.files![0]);
        Pin.uploadPin(fd).then((res) => {
            if (res.ok) {
                store.dispatch({ type: 'navigate', payload: { page: '/profile' } });
            }
        });
    };

    private onInputCallback = () => {
        const form = document.querySelector('.pin-builder__form') as HTMLFormElement;
        const imgInput = document.getElementById('pin-image') as HTMLInputElement;
        this.setState((s: PinCreationScreenState) => {
            return {
                ...s,
                name: form.pinTitle.value,
                description: form.pinDescription.value,
                imgUrl: window.URL.createObjectURL(imgInput.files![0]),
            };
        });
    };

    componentWillUnmount(): void {
        for (const func of this.unsubs) {
            func();
        }
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.onErrorCallback.bind(this)));
    }

    render() {
        return (
            <div key="wrapper">
                <Menu key="menu" />
                <Header
                    key="header"
                    username="username"
                    avatarSrc="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnb.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F002%2F488%2F931%2Flarge%2Fjoo-yann-ang-pudge-final.jpg%3F1462351306&f=1&nofb=1&ipt=8936a27eed33b56c3ad763d110d2b2edb817ceab874b153eee08a16dbd873093&ipo=images"
                />
                <div key="app" id="app">
                    <div key="main__content" className="main__content">
                        <div className="pin-builder__container">
                            <form key="form" className="pin-builder__form" onsubmit={this.onSubmitCallback.bind(this)}>
                                <div key="container" className="pin-builder__img-input-container">
                                    <label
                                        className="pin-builder__label"
                                        for="pin-image"
                                        style={
                                            !this.state.imgUrl
                                                ? ''
                                                : `background: url(${this.state.imgUrl}); background-size: cover;`
                                        }
                                    >
                                        {this.state.imgUrl ? (
                                            <div> </div>
                                        ) : (
                                            <div>
                                                <div className="material-symbols-outlined md-48">upload</div>
                                                <div>Upload</div>
                                            </div>
                                        )}

                                        <input
                                            oninput={this.onInputCallback.bind(this)}
                                            accept="image/jpeg,image/png"
                                            id="pin-image"
                                            type="file"
                                            name="pinImg"
                                            style="display: none;"
                                        />
                                    </label>
                                </div>

                                <div className="pin-builder__form-container">
                                    <h2 key="header" className="pin-builder__header">
                                        Create a pin
                                    </h2>
                                    <div className="pin-builder__inputs-container">
                                        <div key="errMsg" className="pin-builder__error-msg-container">
                                            {this.state.errorMsg}
                                        </div>
                                        <input
                                            key="pin-title-input"
                                            type="text"
                                            name="pinTitle"
                                            placeholder="Add name of the pin"
                                            className="input__custom"
                                            value={this.state.name}
                                        />
                                        <textarea
                                            key="pin-description-input"
                                            className="pin-builder__description-input"
                                            name="pinDescription"
                                            placeholder="Add a Pin Description"
                                            value={this.state.description}
                                        />
                                    </div>
                                    <div className="pin-builder__btn-container">
                                        <button className="pin-builder__submit-btn">save</button>
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
