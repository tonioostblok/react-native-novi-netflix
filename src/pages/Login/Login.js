import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledView, Title, StyledInput, WhiteText, StyledButton,
} from '../../components/StyledComponents';
import { getUserId } from '../../utils/AsyncStorageMethods';

class Login extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;
    getUserId().then((val) => {
      if (val !== null) {
        navigation.navigate('Home');
      }
    });
  }

  submitHandler() {
    const {
      username, password, login, navigation,
    } = this.props;
    if (username !== '' && password !== '') {
      login(username, password);
      getUserId().then((val) => {
        if (val !== null) {
          navigation.navigate('Home');
        }
      });
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
