import { Component, createElement, renderElement } from '@t1d333/pickpinlib';
import { Input, InputProps } from '../Input/input';
import { store } from '../../store/store';

type FormProps = {
    id: string;
    method: string;
    inputs: InputProps[];
    submitBtnText: string;
};

type FormState = {};

export class Form extends Component<FormProps, FormState> {
    private BindedHandler: (e: SubmitEvent) => void = this.HandleSubmit.bind(this); // TODO: не помогает

    HandleSubmit(e: SubmitEvent) {
        console.log('handled form');
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
        const msg = store.getState().validationErrorMessage;
        const msgBox = document.getElementById('error_msg') as HTMLSpanElement;
        msgBox.textContent = msg;
    }

    componentDidMount(): void {
        document.addEventListener('submit', this.BindedHandler);
    }

    componentWillUnmount(): void {
        document.removeEventListener('submit', this.BindedHandler);
    }

    render() {
        return (
            <form key={`form_${this.props.id}`} id={this.props.id} method={this.props.method}>
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
