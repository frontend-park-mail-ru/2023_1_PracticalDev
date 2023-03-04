import pageTmpl from './login.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';

const LoadLogin = () => {
  const templ = Handlebars.template(pageTmpl);
  const emailInput = new Input("email", "email", "email", );
  const passwordInput = new Input("password", "password", "password");
  const loginForm = new Form("Sign in", "post",  "login-form", emailInput.getHtml(), passwordInput.getHtml());
  console.log(loginForm.getHtml());
  return templ({form: loginForm.getHtml()});
};

export default LoadLogin;
