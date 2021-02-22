import { connect } from 'react-redux';
import Login from './Home';
import { fetchActualShows, fetchDeletedShows } from '../../store/netflix';
import { signOut } from '../../store/authentication';

function mapStateToProps(state) {
  return {
    shows: state.netflix.shows,
    user: state.authentication.user,
  };
}

const actions = {
  fetchActualShows,
  fetchDeletedShows,
  signOut,
};

export default connect(mapStateToProps, actions)(Login);
