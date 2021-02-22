import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledView, Title, StyledInput, WhiteText, StyledButton,
} from '../../components/StyledComponents';

class Login extends React.Component {
  componentDidUpdate() {
    const { user, navigation } = this.props;
    if (user.username !== '') {
      navigation.navigate('Home');
    }
  }

  submitHandler() {
    const {
      username, password, login,
    } = this.props;
    if (username !== '' && password !== '') {
      login(username, password);
    }
  }

  render() {
    const { updateUserName, updatePassword } = this.props;
    return (
      <StyledView>
        <Title>
          Login
        </Title>
        <StyledInput
          onChangeText={(event) => updateUserName(event)}
          autoCapitalize="none"
          placeholder="username"
        />
        <StyledInput
          onChangeText={(event) => updatePassword(event)}
          autoCapitalize="none"
          placeholder="password"
        />
        <StyledButton onPress={() => this.submitHandler()}>
          <WhiteText>Submit</WhiteText>
        </StyledButton>
      </StyledView>
    );
  }
}
Login.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  login: PropTypes.func.isRequired,
  updateUserName: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

Login.defaultProps = {
  username: '',
  password: '',
};

export default Login;
