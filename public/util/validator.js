/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным именем пользователя
 * @returns
 */
export const isUsername = (str) => /[a-zA-Z0-9_]{4,20}$/.test(str);

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным паролем
 * @returns
 */
export const isPassword = (str) => /^[a-zA-Z0-9_\-#!$@%^&*+~=:;?\\/]{8,}$/.test(str);

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидной почтой
 * @returns
 */
export const isEmail = (str) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(
        str,
    );
/**
 *
 * @param {string} str Проверяет, является ли входная строка валидным номером телефона
 * @returns
 */
export const isMobilePhone = (str) => /^(\+?7|8)?9\d{9}$/.test(str);

/**
 *
 * @param {string} str Проверяет, является ли входная строка валидной ссылкой
 * @returns
 */
export const isURL = (str) =>
    /https?:\/\/(www\.)?[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%.+~#=//?&]*)/i.test(str);
    
/**
 *
 * @param {string} str Проверяет, является ли входная строка валидной ссылкой на изображение
 * @returns
 */
export const isImage = (str) => /.+\.(?=png|jpe?g|gif|svg)/i.test(str);
