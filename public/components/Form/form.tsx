import { Component, createElement, renderElement } from "@t1d333/pickpinlib";
import { Input, InputProps } from "../Input/input";

type FormProps = {
  id: string;
  method: string;
  inputs: InputProps[];
  submitBtnText: string;
};

type FormState = {};

export class Form extends Component<FormProps, FormState> {
  render() {
    return (
      <form
        key={`form_${this.props.id}`}
        id={this.props.id}
        method={this.props.method}
      >
        <div key="error_msg_wrapper" id="error_msg_wrapper">
          <span key="error_msg" id="error_msg"></span>
        </div>
        <div key="group" className="form_input_group">
          <div key="wrapper" className="inputWrapper">
            {...this.props.inputs.map((props: InputProps) => {
              return (
                <Input
                  {...props}
                  key={`form_${this.props.id}_input_${props.name}`}
                />
              );
            })}
          </div>
          <button key="btn_submit" className="btn_submit">
            {this.props.submitBtnText}
          </button>
        </div>
      </form>
    );
  }
}
