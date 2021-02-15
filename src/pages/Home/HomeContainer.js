import Login from "./Home"
import { connect } from "react-redux"
import { fetchActualShows, fetchDeletedShows } from "../../store/netflix";
function mapStateToProps (state) {
    return {
        shows: state.netflix.shows,
        user: state.authentication.user,
    };
}

const actions = {
    fetchActualShows,
    fetchDeletedShows
};

export default connect(mapStateToProps, actions)(Login);