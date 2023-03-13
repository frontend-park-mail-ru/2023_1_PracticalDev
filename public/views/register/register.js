import pageTmpl from './register.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';
import Ajax from '../../util/ajax.js';
import { isEmail, isPassword, isUsername } from '../../util/validator.js';

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

        if (!isEmail(formData.email)) {
            errorMsgSpan.textContent = 'Wrong email';
            return;
        }

        if (!isUsername(formData.username)) {
            errorMsgSpan.textContent = 'Username can be from 4 to 20 characters, and contain only letters and numbers';
            return;
        }

        if (!isPassword(formData.password)) {
            errorMsgSpan.textContent =
                'The password must be at least 8 characters long and contain the following characters: [a-z], [A-Z], 0-9, -#!$@%^&*+~=:;?';
            return;
        }

        if (formData.password != formData.password_repeat) {
            errorMsgSpan.textContent = 'Password mismatch';
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
