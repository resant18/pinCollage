import { connect } from "react-redux";
import { showModal, hideModal } from "../../actions/modal_actions";
import { fetchUserBoards } from '../../actions/board_actions';
//import { fetchUser } from "../../actions/user_actions";
import BoardIndex from "./board_index";

const mapStateToProps = (state, ownProps) => {    
  // const currentUser = state.entities.users[state.session.id];
  const user = ownProps.user;
  // const username = user.username;
  const boards = ownProps.boards;
  // const pins = Object.values(state.entities.pins);
  return {
    // currentUser,
    user,
    // username,
    boards,
    // pins
  };
};

const mapDispatchToProps = dispatch => {
  return {    
    hideModal: () => dispatch(hideModal()),
    showModal: modal => dispatch(showModal(modal))
  }; 
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardIndex);
