import firebase from '../constants/Firebase';

export const LOGIN_CHANGE = 'LOGIN_CHANGE';
export const USERNAME_CHANGE = 'USERNAME_CHANGE';
export const PASSWORD_CHANGE = 'PASSWORD_CHANGE';

export function loginChange(payload) {
  return ({
    type: LOGIN_CHANGE,
    payload,
  });
}

export function userNameChange(payload) {
  return ({
    type: USERNAME_CHANGE,
    payload,
  });
}
export function passwordChange(payload) {
  return ({
    type: PASSWORD_CHANGE,
    payload,
  });
}

export const db = firebase.firestore();
db.settings({ experimentalForceLongPolling: true });

export const getMe = (hash) => (dispatch) => {
  db.collection('users').where(firebase.firestore.FieldPath.documentId(), '==', hash).get()
    .then((query) => {
      query.forEach((doc) => {
        const user = doc.data();
        dispatch(loginChange(user));
      });
    });
};

export const login = (username, password) => (dispatch) => {
  db.collection('users').where('username', '==', username).get()
    .then((query) => {
      query.forEach((doc) => {
        const user = doc.data();
        if (user.password === password) {
          dispatch(loginChange(user));
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const signOut = () => (dispatch) => {
  dispatch(loginChange({
    username: '',
    password: '',
    country: '',
  }));
};
export const updateUserName = (username) => (dispatch) => {
  dispatch(userNameChange(username));
};
export const updatePassword = (password) => (dispatch) => {
  dispatch(passwordChange(password));
};
export const initialState = {
  username: '',
  password: '',
  user: {
    username: '',
    password: '',
    country: '',
  },
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CHANGE:
      return { ...state, user: action.payload };
    case USERNAME_CHANGE:
      return { ...state, username: action.payload };
    case PASSWORD_CHANGE:
      return { ...state, password: action.payload };
    default:
      return { ...state };
  }
}
