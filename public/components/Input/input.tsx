import { Component, createElement } from '@t1d333/pickpinlib';

import './input.css';

export type InputProps = {
    placeholder: string;
    name: string;
    type: string;
    icon: string;
    validator?: Function;
    value?: string;
};

export type InputState = {};

export class Input extends Component<InputProps, InputState> {
    render() {
        return (
            <div key={'input__container-' + this.props.name} className="input__container">
                {this.props.icon ? (
                    <div key={'input__icon-container-' + this.props.name} className="input__icon-container">
                        <span key={'input__icon-' + this.props.name} className="input__icon">
                            <span key="icon" className="material-symbols-outlined" aria-hidden="true">
                                {this.props.icon}
                            </span>
                        </span>
                        <input
                            oninput={this.props.validator ? this.props.validator : () => {}}
                            key={'input-' + this.props.name}
                            className="input__custom input__has_icon"
                            placeholder={this.props.placeholder}
                            name={this.props.name}
                            type={this.props.type}
                            value={this.props.value ?? ''}
                        ></input>
                    </div>
                ) : (
                    <input
                        key={'input-' + this.props.name}
                        className="input__custom "
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        type={this.props.name}
                    ></input>
                )}
            </div>
        );
    }
}
