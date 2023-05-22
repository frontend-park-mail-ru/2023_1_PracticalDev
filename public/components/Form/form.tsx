import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { Input, InputProps } from '../Input/input';
import { store } from '../../store/store';

import './form.css';

type FormProps = {
    id: string;
    method: string;
    inputs: InputProps[];
    submitBtnText: string;
};

type FormState = {};

export class Form extends Component<FormProps, FormState> {
    private BindedHandler: (e: SubmitEvent) => void = this.HandleSubmit.bind(this); // TODO: не помогает
    private unsubs: Function[] = [];
    HandleSubmit(_: SubmitEvent) {
        const form = document.getElementById(this.props.id);
        const formData = Object.values(form!).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});
        store.dispatch({
            type: `${this.props.id}Submit`,
            payload: {
                formData: { ...formData },
            },
        });
    }

    HandleValidationError() {
        if (store.getState().type === 'validationErrorMessage') {
            const msgBox = document.getElementById('error_msg') as HTMLSpanElement;
            const msg = store.getState().validationErrorMessage;
            msgBox.innerHTML = msg;
        }
    }

    componentDidMount(): void {
        this.unsubs.push(store.subscribe(this.HandleValidationError.bind(this)));
    }

    componentWillUnmount(): void {}

    render() {
        return (
            <form
                key={`form_${this.props.id}`}
                id={this.props.id}
                onsubmit={this.BindedHandler}
                method={this.props.method}
            >
                <div key="error_msg_wrapper" id="error_msg_wrapper">
                    <span key="error_msg" id="error_msg"></span>
                </div>
                <div key="group" className="form_input_group">
                    <div key="wrapper" className="inputWrapper">
                        {...this.props.inputs.map((props: InputProps) => {
                            return <Input {...props} key={`form_${this.props.id}_input_${props.name}`} />;
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
