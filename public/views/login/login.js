import pageTmpl from './login.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';
import Ajax from '../../util/ajax.js';
import { isEmail, isPassword } from '../../util/validator.js';

const LoadLogin = () => {
    const templ = Handlebars.template(pageTmpl);
    const emailInput = new Input('email', 'email', 'email');
    const passwordInput = new Input('password', 'password', 'password');
    const loginForm = new Form('Sign in', 'post', 'login-form', emailInput.getHtml(), passwordInput.getHtml());
    return templ({ form: loginForm.getHtml() });
};

const AddLoginListeners = () => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        const errom_msg_span = document.querySelector('#error_msg');
        const formData = Object.values(form).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});

        console.log(!formData.email, !formData.password);

        if (!formData.email || !formData.password) {
            errom_msg_span.textContent = 'Email or password cannot be empty';
            return;
        }

        Ajax.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    errom_msg_span.textContent = 'Wrong email or password';
                }
            } else {
                document.getElementById('redirect-login').click();
            }
        });
    });
};

export { LoadLogin, AddLoginListeners };
