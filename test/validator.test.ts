import { describe, it } from 'mocha';
import assert from 'assert';

import {
    validateUsername, validatePassword, validateEmail, validateMobilePhone,
    validateUrl, validateImage,
    InvalidCharactersError, NoDigitsError, NoLowercaseError, NoSpecialCharactersError,
    NoUppercaseError, TooLongPasswordError, TooLongUsernameError, TooShortPasswordError,
    TooShortUsernameError, InvalidEmailError, EmptyStringError, InvalidMobilePhoneError,
    InvalidUrlError, InvalidImageError,
} from '../public/util/validator';

describe('validateUsername tests', function() {
    // positive
    it('normal username', function() {
        assert.doesNotThrow(() => validateUsername('normalusername'));
    });
    // negative
    it('empty username', function() {
        assert.throws(() => validateUsername(''), TooShortUsernameError);
    });
    it('too short username', function() {
        assert.throws(() => validateUsername('min'), TooShortUsernameError);
    });
    it('too long username', function() {
        assert.throws(() => validateUsername('super_long_username__'), TooLongUsernameError);
    });
    it('invalid characters in username', function() {
        assert.throws(() => validateUsername('username%'), InvalidCharactersError);
    });
});

describe('validatePassword tests', function() {
    // positive
    it('normal password', function() {
        assert.doesNotThrow(() => validatePassword('normAl_length_password1'));
    });
    // negative
    it('empty password', function() {
        assert.throws(() => validatePassword(''), TooShortPasswordError);
    });
    it('too short password', function() {
        assert.throws(() => validatePassword('Short12'), TooShortPasswordError);
    });
    it('too long password', function() {
        assert.throws(() => validatePassword('Super_very_too_long_password12345'), TooLongPasswordError);
    });
    it('no uppercase letters', function() {
        assert.throws(() => validatePassword('no_uppercase_letters'), NoUppercaseError);
    });
    it('no lowercase letters', function() {
        assert.throws(() => validatePassword('NO_LOWERCASE_LETTERS'), NoLowercaseError);
    });
    it('no digits', function() {
        assert.throws(() => validatePassword('nO_digits'), NoDigitsError);
    });
    it('no special characters', function() {
        assert.throws(() => validatePassword('nOdigits9'), NoSpecialCharactersError);
    });
});

describe('validateEmail tests', function() {
    // positive
    it('normal email', function() {
        assert.doesNotThrow(() => validateEmail('normal@normal.com'));
    });
    // negative
    it('empty email', function() {
        assert.throws(() => validateEmail(''), EmptyStringError);
    });
    it('no \'@\' character', function() {
        assert.throws(() => validateEmail('testtest.com'), InvalidEmailError);
    });
});

describe('validateMobilePhone tests', function() {
    // positive
    it('normal mobile phone', function() {
        assert.doesNotThrow(() => validateMobilePhone('+79347222102'));
    });
    // negative
    it('empty mobile phone', function() {
        assert.throws(() => validateMobilePhone(''), EmptyStringError);
    });
    it('invalid character in mobile phone', function() {
        assert.throws(() => validateMobilePhone('+79347222102d'), InvalidMobilePhoneError);
    });
});

describe('validateUrl tests', function() {
    // positive
    it('normal url', function() {
        assert.doesNotThrow(() => validateUrl('http://pickpin.ru/login'));
    });
    // negative
    it('empty url', function() {
        assert.throws(() => validateUrl(''), EmptyStringError);
    });
    it('not http(s) in url', function() {
        assert.throws(() => validateUrl('htp://pickpin.ru/login'), InvalidUrlError);
    });
});

describe('validateImage tests', function() {
    // positive
    it('normal image', function() {
        assert.doesNotThrow(() => validateImage('normal.jpg'));
    });
    // negative
    it('empty image', function() {
        assert.throws(() => validateImage(''), EmptyStringError);
    });
    it('invalid image file extension', function() {
        assert.throws(() => validateImage('invalid_extension.pdf'), InvalidImageError);
    });
});
