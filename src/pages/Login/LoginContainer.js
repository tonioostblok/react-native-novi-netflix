import { connect } from 'react-redux';
import Login from './Login';
import { login, updateUserName, updatePassword } from '../../store/authentication';

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
    username: state.authentication.username,
    password: state.authentication.password,
  };
}

const actions = {
  login,
  updateUserName,
  updatePassword,
};

export default connect(mapStateToProps, actions)(Login);
