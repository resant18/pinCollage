import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";
import { showModal } from "../../actions/modal_actions";
import NavBar from "./navbar";

const mapStateToProps = state => {
  return {
    currentUsername: state.entities.users[state.session.id],
    loggedInUser: state.session.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()), 
    showModal: () => dispatch(showModal('signup')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
