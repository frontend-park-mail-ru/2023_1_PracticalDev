import pageTmpl from './register.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';
import Ajax from '../../util/ajax.js';
import { validateEmail, validateUsername, validatePassword, EmptyStringError } from '../../util/validator.js';

/**
 * Функция для проверки аутенфикации пользователя
 */
const checkAuth = async () => {
    const response = await Ajax.get('/api/auth/me');
    if (response.ok) {
        const redirect = new CustomEvent('navigate', {
            bubbles: true,
            detail: { link: '/feed', user: response.body },
        });
        const div = document.getElementById('app');
        div.dispatchEvent(redirect);
    }
};

/**
 * Функция для построения страницы регистрация
 * @return {string} - html код страница
 * */

const LoadSignup = async () => {
    await checkAuth();

    const templ = Handlebars.template(pageTmpl);
    const usernameInput = new Input('Enter your username', 'username', 'text');
    const emailInput = new Input('Enter your email', 'email', 'email');
    const nameInput = new Input('Enter your name', 'name', 'text');
    const passwordInput = new Input('Enter your password', 'password', 'password');
    const repeatPasswordInput = new Input('Repeat your password', 'password_repeat', 'password');
    const signupForm = new Form(
        'Register',
        'post',
        'register-form',
        usernameInput.getHtml(),
        nameInput.getHtml,
        emailInput.getHtml(),
        passwordInput.getHtml(),
        repeatPasswordInput.getHtml(),
    );
    return templ({ form: signupForm.getHtml() });
};

/**
 * Функция для добавления обработчиков на странице регистрации
 * */
const AddRegisterListeners = () => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById('register-form');
    form.addEventListener('submit', (event) => {
        const errorMsgSpan = document.querySelector('#error_msg');
        const formData = Object.values(form).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});

        try {
            if (
                formData.username == '' ||
                formData.Email == '' ||
                formData.name == '' ||
                formData.password == '' ||
                formData.password_repeat == ''
            ) {
                throw EmptyStringError;
            }

            validateUsername(formData.username);
            validateEmail(formData.email);
            validatePassword(formData.password);

            if (formData.password_repeat !== formData.password) {
                throw new Error('Password mismatch');
            }
        } catch (err) {
            if (err === EmptyStringError) {
                errorMsgSpan.textContent = 'All fields must be not empty';
            } else {
                errorMsgSpan.textContent = err.message;
            }
            return;
        }

        Ajax.post('/api/auth/signup', {
            email: formData.email,
            password: formData.password,
            username: formData.username,
            name: formData.name,
        }).then((response) => {
            if (!response.ok) {
                switch (response.status) {
                    case 400:
                        errorMsgSpan.textContent = 'User with this email already exists';
                        return;
                    case 500:
                        errorMsgSpan.textContent = 'Failed to create user';
                        return;
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

export { LoadSignup, AddRegisterListeners };
