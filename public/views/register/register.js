import pageTmpl from './register.handlebars.js'
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';

const LoadSignup = () => {
  const templ = Handlebars.template(pageTmpl);
  const usernameInput = new Input("Enter your username", "username", "text");
  const emailInput = new Input("Enter your email", "email", "email");
  const passwordInput = new Input("Enter your password", "password", "password");
  const signupForm = new Form(
    "Register",
    "post",
    "login-form",
    usernameInput.getHtml(),
    emailInput.getHtml(),
    passwordInput.getHtml()
  );
  return templ({form: signupForm.getHtml()});
};

export default LoadSignup;


