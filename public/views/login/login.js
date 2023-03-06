import pageTmpl from './login.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';
import Ajax from '../../util/ajax.js';
import { isEmail, isPassword } from '../../util/validator.js';

/**
 * Функция для построения страницы входа
 * @return {string} - html код страница
 * */
const LoadLogin = () => {
    const templ = Handlebars.template(pageTmpl);
    const emailInput = new Input('email', 'email', 'email');
    const passwordInput = new Input('password', 'password', 'password');
    const loginForm = new Form('Sign in', 'post', 'login-form', emailInput.getHtml(), passwordInput.getHtml());
    return templ({ form: loginForm.getHtml() });
};

/**
 * Функция для добавления обработчиков на странице входа
 * */
const AddLoginListeners = () => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById('login-form');
    form.addEventListener('submit', (event) => {
        const errorMsgSpan = document.querySelector('#error_msg');
        const formData = Object.values(form).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});

        if (!isEmail(formData.email)) {
            errorMsgSpan.textContent = 'Wrong email';
            return;
        }

        if (!isPassword(formData.password)) {
            errorMsgSpan.textContent =
                'The password must be at least 8 characters long and contain the following characters: [a-z], [A-Z], 0-9, -#!$@%^&*+~=:;?';
            return;
        }

        Ajax.post('/api/auth/login', {
            email: formData.email,
            password: formData.password,
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    errorMsgSpan.textContent = 'Wrong email or password';
                }
            } else {
                const redirect = new CustomEvent('navigate', {
                    bubbles: true,
                    detail: { link: '/feed', user: response.body },
                });
                form.dispatchEvent(redirect);
            }
        });
    });
};

export { LoadLogin, AddLoginListeners };
