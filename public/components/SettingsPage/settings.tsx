import { Component, createElement } from '@t1d333/pickpinlib';
import Menu from '../Menu/menu';
import { store } from '../../store/store';
import User from '../../models/user';
import { loadUser } from '../../actions/user';
import { Main } from '../Main/main';

interface SettingsScreenProps {}
interface SettingsScreenState {
    username: string;
    name: string;
    avatarSrc: string;
}

export class SettingsScreen extends Component<SettingsScreenProps, SettingsScreenState> {
    private unsubs: (() => void)[] = [];

    constructor() {
        super();
        const state = store.getState();
        this.state = {
            username: state.user?.username!,
            name: state.user?.name!,
            avatarSrc: state.user?.profile_image!,
        };
    }

    private userLoadHandler = () => {
        if (store.getState().type !== 'loadedUser') {
            return;
        }

        this.setState((s) => {
            const state = store.getState();
            return {
                username: state.user?.username!,
                name: state.user?.name!,
                avatarSrc: state.user?.profile_image!,
            };
        });
    };

    private onUsernameSubmitCallback = () => {
        const form = document.getElementById('usernameForm') as HTMLFormElement;
        const fd = new FormData();
        if (!form.username.value) {
            return;
        }
        fd.append('username', form.username.value);
        User.patchUser(fd).then(async (resp) => {
            let data = resp.body;
            const user = store.getState().user;
            user!.username = data.username;
            loadUser(user!);
        });
    };

    private onNameSubmitCallback = () => {
        const form = document.getElementById('nameForm') as HTMLFormElement;
        const fd = new FormData();
        if (!form.username.value) {
            return;
        }

        fd.append('name', form.username.value);

        User.patchUser(fd).then(async (resp) => {
            let data = resp.body;
            const user = store.getState().user;
            user!.name = data.name;
            loadUser(user!);
        });
    };

    private onURLSubmitCallback = () => {
        const form = document.getElementById('urlForm') as HTMLFormElement;
        const fd = new FormData();
        fd.append('website_url', form.url.value);
        User.patchUser(fd).then(async (resp) => {
            let data = resp.body;
            const user = store.getState().user;
            loadUser(user!);
            form.reset();
        });
    };

    private onImageSubmitCallback = () => {
        const form = document.getElementById('imageForm') as HTMLFormElement;
        const fd = new FormData();
        if (!form.image.files.length) {
            return;
        }
        fd.append('bytes', form.image.files[0]);
        User.patchUser(fd).then(async (resp) => {
            let data = resp.body;
            const user = store.getState().user;
            user!.profile_image = data.profile_image;
            loadUser(user!);
            form.reset();
        });
    };

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.userLoadHandler.bind(this)));
    }

    componentWillUnmount(): void {
        this.unsubs.forEach((fun) => {
            fun();
        });
    }

    render() {
        return (
            <Main>
                <div className="settings__container">
                    <div className="settings__content">
                        <form
                            id="usernameForm"
                            key="username-form"
                            className="settings__form"
                            onsubmit={this.onUsernameSubmitCallback.bind(this)}
                        >
                            <div className="settings__input-container">
                                <label className="sesttings__form-label">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="enter username"
                                    className="input__custom settings__input"
                                    value={this.state.username}
                                />
                            </div>

                            <input type="submit" value="save" className="settings__submit-btn" />
                        </form>
                        <form
                            id="nameForm"
                            key="name-form"
                            className="settings__form"
                            onsubmit={this.onNameSubmitCallback.bind(this)}
                        >
                            <div className="settings__input-container">
                                <label className="sesttings__form-label">Name</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="enter name"
                                    className="input__custom settings__input"
                                    value={this.state.name}
                                />
                            </div>

                            <input type="submit" value="save" className="settings__submit-btn" />
                        </form>
                        <form
                            id="imageForm"
                            key="image-form"
                            className="settings__form settings__form-img"
                            onsubmit={this.onImageSubmitCallback.bind(this)}
                        >
                            <img
                                for="image"
                                src={!this.state.avatarSrc ? '' : this.state.avatarSrc}
                                className="settings__avatar-img"
                            />

                            <div className="settings__file-input-container">
                                <input type="file" name="image" accept="image/jpeg,image/png" />

                                <input type="submit" value="save" className="settings__submit-btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </Main>
        );
    }
}
