import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import {
  StyledView, WhiteText, StyledButton, ButtonWrapper,
} from '../../components/StyledComponents';
import Show from '../../components/Show';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 5,
      fetchDeleted: false,
    };
  }

  handleButtonClick(val) {
    const { fetchActualShows, fetchDeletedShows, user } = this.props;
    if (val === 'deleted') {
      fetchDeletedShows(0, 5, user.country);
      this.setState({
        fetchDeleted: true,
      });
    } else {
      fetchActualShows(0, 5, user.country);
    }
  }

  changePage(goBack = false) {
    const {
      fetchDeletedShows,
      fetchActualShows,
      user,
    } = this.props;
    const { page, perPage, fetchDeleted } = this.state;
    let newPage = page + 1;
    if (goBack) {
      newPage = (page <= 1) ? 1 : page - 1;
    }
    this.setState({
      page: newPage,
    });
    const offset = (newPage - 1) * perPage;
    if (fetchDeleted) {
      fetchDeletedShows(offset, perPage, user.country);
    } else {
      fetchActualShows(offset, perPage, user.country);
    }
  }

  signUserOut() {
    const { navigation, signOut } = this.props;
    signOut();
    navigation.navigate('Login');
  }

  render() {
    const { shows } = this.props;
    return (
      <StyledView>
        <StyledButton>
          <WhiteText
            onPress={() => this.signUserOut()}
          >
            Sign out
          </WhiteText>
        </StyledButton>
        <ButtonWrapper>
          <StyledButton
            buttonWidth="49%"
            onPress={() => this.handleButtonClick()}
          >
            <WhiteText>
              New
            </WhiteText>
          </StyledButton>
          <StyledButton
            buttonWidth="49%"
            onPress={() => this.handleButtonClick('deleted')}
          >
            <WhiteText>
              Expiring
            </WhiteText>
          </StyledButton>
        </ButtonWrapper>

        {shows.length > 0
                && (
                <ScrollView>
                  {shows.map((val) => (
                    <Show
                      key={val.title}
                      img={val.img}
                      title={val.title}
                      synopsis={val.synopsis}
                      year={val.year}
                    />
                  ))}
                  <ButtonWrapper>
                    <StyledButton
                      buttonWidth="49%"
                      onPress={() => this.changePage(true)}
                    >
                      <WhiteText>
                        Previous
                      </WhiteText>
                    </StyledButton>
                    <StyledButton
                      buttonWidth="49%"
                      onPress={() => this.changePage()}
                    >
                      <WhiteText>
                        Next
                      </WhiteText>
                    </StyledButton>
                  </ButtonWrapper>
                </ScrollView>
                )}
      </StyledView>
    );
  }
}

Home.propTypes = {
  fetchDeletedShows: PropTypes.func.isRequired,
  fetchActualShows: PropTypes.func.isRequired,
  shows: PropTypes.instanceOf(Array).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
