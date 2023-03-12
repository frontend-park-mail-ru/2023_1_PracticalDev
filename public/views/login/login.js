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
    const emailInput = new Input('email', 'email', 'email', 'alternate_email');
    const passwordInput = new Input('password', 'password', 'password', 'lock');
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

        if (formData.email === '' || formData.password === '') {
            errorMsgSpan.textContent = 'Email or password cannot be empty';
            return;
        }

        if (!isEmail(formData.email) || !isPassword(formData.password)) {
            errorMsgSpan.textContent = 'Wrong email or password';
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
