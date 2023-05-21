import assert from 'assert';

import {
    validateUsername,
    validatePassword,
    validateEmail,
    validateMobilePhone,
    validateUrl,
    validateImage,
    InvalidCharactersError,
    NoDigitsError,
    NoLowercaseError,
    NoSpecialCharactersError,
    NoUppercaseError,
    TooLongPasswordError,
    TooLongUsernameError,
    TooShortPasswordError,
    TooShortUsernameError,
    InvalidEmailError,
    EmptyStringError,
    InvalidMobilePhoneError,
    InvalidUrlError,
    InvalidImageError,
} from '../public/util/validator';

describe('validateUsername tests', function () {
    // positive
    it('normal username', function () {
        expect(() => validateUsername('normalusername')).not.toThrow();
    });
    // negative
    it('empty username', function () {
        expect(() => validateUsername('')).toThrow(TooShortUsernameError);
    });
    it('too short username', function () {
        expect(() => validateUsername('min')).toThrow(TooShortUsernameError);
    });
    it('too long username', function () {
        expect(() => validateUsername('super_long_username__')).toThrow(TooLongUsernameError);
    });
    it('invalid characters in username', function () {
        expect(() => validateUsername('username%')).toThrow(InvalidCharactersError);
    });
});

describe('validatePassword tests', function () {
    // positive
    it('normal password', function () {
        expect(() => validatePassword('normAl_length_password1')).not.toThrow();
    });
    // negative
    it('empty password', function () {
        expect(() => validatePassword('')).toThrow(TooShortPasswordError);
    });
    it('too short password', function () {
        expect(() => validatePassword('Short12')).toThrow(TooShortPasswordError);
    });
    it('too long password', function () {
        expect(() => validatePassword('Super_very_too_long_password12345')).toThrow(TooLongPasswordError);
    });
    it('no uppercase letters', function () {
        expect(() => validatePassword('no_uppercase_letters')).toThrow(NoUppercaseError);
    });
    it('no lowercase letters', function () {
        expect(() => validatePassword('NO_LOWERCASE_LETTERS')).toThrow(NoLowercaseError);
    });
    it('no digits', function () {
        expect(() => validatePassword('nO_digits')).toThrow(NoDigitsError);
    });
    it('no special characters', function () {
        expect(() => validatePassword('nOdigits9')).toThrow(NoSpecialCharactersError);
    });
});

describe('validateEmail tests', function () {
    // positive
    it('normal email', function () {
        expect(() => validateEmail('normal@normal.com')).not.toThrow();
    });
    // negative
    it('empty email', function () {
        expect(() => validateEmail('')).toThrow(EmptyStringError);
    });
    it("no '@' character", function () {
        expect(() => validateEmail('testtest.com')).toThrow(InvalidEmailError);
    });
});

describe('validateMobilePhone tests', function () {
    // positive
    it('normal mobile phone', function () {
        expect(() => validateMobilePhone('+79347222102')).not.toThrow();
    });
    // negative
    it('empty mobile phone', function () {
        expect(() => validateMobilePhone('')).toThrow(EmptyStringError);
    });
    it('invalid character in mobile phone', function () {
        expect(() => validateMobilePhone('+79347222102d')).toThrow(InvalidMobilePhoneError);
    });
});

describe('validateUrl tests', function () {
    // positive
    it('normal url', function () {
        expect(() => validateUrl('http://pickpin.ru/login')).not.toThrow();
    });
    // negative
    it('empty url', function () {
        expect(() => validateUrl('')).toThrow(EmptyStringError);
    });
    it('not http(s) in url', function () {
        expect(() => validateUrl('htp://pickpin.ru/login')).toThrow(InvalidUrlError);
    });
});

describe('validateImage tests', function () {
    // positive
    it('normal image', function () {
        expect(() => validateImage('normal.jpg')).not.toThrow();
    });
    // negative
    it('empty image', function () {
        expect(() => validateImage('')).toThrow(EmptyStringError);
    });
    it('invalid image file extension', function () {
        expect(() => validateImage('invalid_extension.pdf')).toThrow(InvalidImageError);
    });
});
