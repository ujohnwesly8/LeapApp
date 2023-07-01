import {
  signup,
  login,
  signin,
  otp,
  alreadyExistingtext,
  Donthavetext,
  owner,
  borrower,
  role,
  dashboard,
  recentlyAdded,
  rentalHistory,
  continueText,
  addImages,
} from '../../../src/constants/languages/en';

describe('Language Constants', () => {
  it('should have the correct value for "signup"', () => {
    expect(signup).toEqual('Signup');
  });

  it('should have the correct value for "login"', () => {
    expect(login).toEqual('Login');
  });

  it('should have the correct value for "signin"', () => {
    expect(signin).toEqual('Signin');
  });

  it('should have the correct value for "otp"', () => {
    expect(otp).toEqual('otp');
  });

  it('should have the correct value for "alreadyExistingtext"', () => {
    expect(alreadyExistingtext).toEqual(' Already have an account?');
  });

  it('should have the correct value for "Donthavetext"', () => {
    expect(Donthavetext).toEqual("Don't have an account?");
  });

  it('should have the correct value for "owner"', () => {
    expect(owner).toEqual('Owner');
  });

  it('should have the correct value for "borrower"', () => {
    expect(borrower).toEqual('Borrower');
  });

  it('should have the correct value for "role"', () => {
    expect(role).toEqual('Select Role');
  });

  it('should have the correct value for "dashboard"', () => {
    expect(dashboard).toEqual('Dashboard');
  });

  it('should have the correct value for "recentlyAdded"', () => {
    expect(recentlyAdded).toEqual('Recently Added');
  });

  it('should have the correct value for "rentalHistory"', () => {
    expect(rentalHistory).toEqual('Rental History');
  });

  it('should have the correct value for "continueText"', () => {
    expect(continueText).toEqual('Continue with');
  });

  it('should have the correct value for "addImages"', () => {
    expect(addImages).toEqual('Add Images');
  });
});
