import { Component, createElement, renderElement } from "@t1d333/pickpinlib";

export type InputProps = {
  placeholder: string;
  name: string;
  type: string;
  icon: string;
};

export type InputState = {};

export class Input extends Component<InputProps, InputState> {
  render() {
    return (
      <div className="input__container">
        {this.props.icon ? (
          <div>
            <span className="input__icon">
              <span className="material-symbols-outlined" aria-hidden="true">
                {this.props.icon}
              </span>
            </span>
            <input
              className="input__custom input__has_icon"
              placeholder={this.props.placeholder}
              name={this.props.name}
              type={this.props.type}
            ></input>
          </div>
        ) : (
          <input
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
