// General errors
export const EmptyStringError = new Error('Empty string');

// Username errors
export const TooShortUsernameError = new Error('Username must be at least 4 characters');
export const TooLongUsernameError = new Error('Username must be no more than 20 characters');
export const InvalidCharactersError = new Error('Username must contain only letters, digits and \'_\'');

// Password errors
export const TooShortPasswordError = new Error('Password must be at least 8 characters');
export const TooLongPasswordError = new Error('Password must be no more than 32 characters');
export const NoUppercaseError = new Error('Password must contain one or more uppercase letters');
export const NoLowercaseError = new Error('Password must contain one or more lowercase letters');
export const NoDigitsError = new Error('Password must contain one or more digits');
export const NoSpecialCharactersError = new Error('Password must contain one or more special characters');

// Other errors
export const InvalidEmailError = new Error('Invalid email');
export const InvalidMobilePhoneError = new Error('Invalid mobile phone');
export const InvalidUrlError = new Error('Invalid URL');
export const InvalidImageError = new Error('Invalid image');

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным именем пользователя
 * @returns
 */
export function validateUsername(str) {
    if (str.length < 4) {
        throw TooShortUsernameError;
    } else if (str.length > 20) {
        throw TooLongUsernameError;
    } else if (!/^[a-zа-яA-ZА-Я0-9_]+$/.test(str)) {
        throw InvalidCharactersError;
    }
}

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным паролем
 * @returns
 */
export function validatePassword(str) {
    if (str.length < 8) {
        throw TooShortPasswordError;
    } else if (str.length > 32) {
        throw TooLongPasswordError;
    } else if (!/[A-ZА-Я]/.test(str)) {
        throw NoUppercaseError;
    } else if (!/[a-zа-я]/.test(str)) {
        throw NoLowercaseError;
    } else if (!/[0-9]/.test(str)) {
        throw NoDigitsError;
    } else if (!/[_\-#!$@%^&*+~=:;?\\/]/.test(str)) {
        throw NoSpecialCharactersError;
    }
}

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным адресом электронной почтой
 * @returns
 */
export function validateEmail(str) {
    if (str.length === 0) {
        throw EmptyStringError;
    }
    const valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(
        str,
    );
    if (!valid) {
        throw InvalidEmailError;
    }
}

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным номером телефона
 * @returns
 */
export function validateMobilePhone(str) {
    if (str.length === 0) {
        throw EmptyStringError;
    } else if (!/^(\+?7|8)?9\d{9}$/.test(str)) {
        throw InvalidMobilePhoneError;
    }
}

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидной ссылкой
 * @returns
 */
export function validateUrl(str) {
    if (str.length === 0) {
        throw EmptyStringError;
    }
    const valid = /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/i.test(str);
    if (!valid) {
        throw InvalidUrlError;
    }
}

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидной ссылкой на изображение
 * @returns
 */
export function validateImage(str) {
    if (str.length === 0) {
        throw EmptyStringError;
    } else if (!/.+\.(?=png|jpe?g|gif|svg)/i.test(str)) {
        throw InvalidImageError;
    }
}
