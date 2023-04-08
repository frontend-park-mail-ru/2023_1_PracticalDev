import { Component, createElement, renderElement } from "@t1d333/pickpinlib";
import { Form } from "./form";
import { Input } from "./input";
import AuthLogoSection from "./auth_section";
type AuthProps = {};
type AuthState = {};

const loginInputs = [
  {
    name: "email",
    type: "email",
    placeholder: "email",
    icon: "alternate_email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Input your password",
    icon: "lock",
  },
];

const formProps = {
  id: "loginForm",
  method: "post",
  inputs: loginInputs,
  submitBtnText: "login",
};

export class LoginScreen extends Component<AuthProps, AuthState> {
  render() {
    return (
      <div className="wrapper">
        <AuthLogoSection illustrationSrc="/static/img/animate.svg" />

        <div className="section_login">
          <h1 className="header__login">Welcome back</h1>
          <hr style="width:70%;;border:1px solid #276678;" />
          <div className="form_wrapper">
            <Form {...formProps} />
            <div className="form_help_section">
              <a href="/signup" id="register_link">
                {" "}
                Don't have an account?{" "}
              </a>
              <a href="/signup" id="password_recover_link">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
