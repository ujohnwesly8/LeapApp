import {
  passwordValidation,
  phonenumberValidation,
} from '../../../src/constants/Regex';

describe('Regex Patterns', () => {
  it('should match the password validation pattern', () => {
    const validPasswords = ['Abcdefg1#', 'Password123!', 'StrongP@ssword1'];

    const invalidPasswords = ['weakpassword', '12345678', 'Password!'];

    validPasswords.forEach(password => {
      expect(passwordValidation.test(password)).toBeTruthy();
    });

    invalidPasswords.forEach(password => {
      expect(passwordValidation.test(password)).toBeFalsy();
    });
  });

  it('should match the phone number validation pattern', () => {
    const validPhoneNumbers = ['1234567890', '9876543210', '5555555555'];

    const invalidPhoneNumbers = ['123', '12345678901', 'abcdefghij'];

    validPhoneNumbers.forEach(phoneNumber => {
      expect(phonenumberValidation.test(phoneNumber)).toBeTruthy();
    });

    invalidPhoneNumbers.forEach(phoneNumber => {
      expect(phonenumberValidation.test(phoneNumber)).toBeFalsy();
    });
  });
});
