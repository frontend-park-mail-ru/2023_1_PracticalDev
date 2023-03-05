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
        const formData = Object.values(form).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});

        if (!(isEmail(formData.email) && isPassword(formData.password))) {
            // Добавить обработку неправильных данных
        }

        Ajax.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    // Добавить обработку неправильных данных
                }
            } else {
                document.getElementById('redirect-login').click();
            }
        });
    });
};

export { LoadLogin, AddLoginListeners };
