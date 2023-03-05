import pageTmpl from './register.handlebars.js';
import Input from '../../components/input/input.js';
import Form from '../../components/form/form.js';
import Ajax from '../../util/ajax.js';
import { isEmail, isPassword, isUsername } from '../../util/validator.js';

const LoadSignup = () => {
    const templ = Handlebars.template(pageTmpl);
    const usernameInput = new Input('Enter your username', 'username', 'text');
    const emailInput = new Input('Enter your email', 'email', 'email');
    const passwordInput = new Input('Enter your password', 'password', 'password');
    const nameInput = new Input('Enter your name', 'name', 'text');
    const signupForm = new Form(
        'Register',
        'post',
        'register-form',
        usernameInput.getHtml(),
        emailInput.getHtml(),
        passwordInput.getHtml(),
        nameInput.getHtml,
    );
    return templ({ form: signupForm.getHtml() });
};

const AddRegisterListeners = () => {
    /** @type {HTMLFormElement} */
    const form = document.getElementById('register-form');
    form.addEventListener('submit', (event) => {
        const formData = Object.values(form).reduce((obj, field) => {
            obj[field.name] = field.value;
            return obj;
        }, {});

        if (
            !(
                isEmail(formData.email) &&
                isPassword(formData.password) &&
                isUsername(formData.username) &&
                formData.name !== ''
            )
        ) {
            // Добавить обработку неправильных данных
        }

        Ajax.post('/api/auth/signup', {
            email: formData.email,
            password: formData.password,
            username: formData.username,
            name: formData.name,
        }).then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    // Добавить обработку неправильных данных
                }
            } else {
                document.getElementById('redirect-register').click();
            }
        });
    });
};

export { LoadSignup, AddRegisterListeners };
