import {
  FETCH_SHOWS_CHANGE, fetchShowsChange,
} from '../src/store/netflix.js';
import {
  LOGIN_CHANGE, USERNAME_CHANGE, PASSWORD_CHANGE, loginChange, userNameChange, passwordChange,
} from '../src/store/authentication.js';

describe('actions', () => {
  it('Should create an action to add shows to the state', () => {
    const payload = [
      {
        title: 'Test show',
        img: 'Empty image string',
        year: '2018',
        synopsis: 'Test synopsis',
      },
    ];
    const expectedAction = {
      type: FETCH_SHOWS_CHANGE,
      payload,
    };
    expect(fetchShowsChange(payload)).toEqual(expectedAction);
  });
  it('Should create an action to add a username to the state', () => {
    const payload = 'username';
    const expectedAction = {
      type: USERNAME_CHANGE,
      payload,
    };
    expect(userNameChange(payload)).toEqual(expectedAction);
  });
  it('Should create an action to add a password to the state', () => {
    const payload = 'password';
    const expectedAction = {
      type: PASSWORD_CHANGE,
      payload,
    };
    expect(passwordChange(payload)).toEqual(expectedAction);
  });
  it('Should create an action to change the user object', () => {
    const payload = {
      username: 'username',
      password: 'password',
      country: '67',
    };
    const expectedAction = {
      type: LOGIN_CHANGE,
      payload,
    };
    expect(loginChange(payload)).toEqual(expectedAction);
  });
});
