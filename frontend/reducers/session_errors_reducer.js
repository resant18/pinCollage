import { merge } from 'lodash';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS,
  CLEAR_SESSION_ERRORS,
  CLEAR_SESSION_USERNAME_ERRORS,
  CLEAR_SESSION_PASSWORD_ERRORS,
  CLEAR_SESSION_EMAIL_ERRORS
} from '../actions/session_actions';

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {};
    case RECEIVE_SESSION_ERRORS:      
      return action.errors || {};
    case CLEAR_SESSION_ERRORS:
      return {};
    case CLEAR_SESSION_USERNAME_ERRORS:
      return merge({}, state, { username: [] });
      //return { ...state, username: [] };
    case CLEAR_SESSION_EMAIL_ERRORS:
      return merge({}, state, { email: [] });
      //return { ...state, email: [] };
    case CLEAR_SESSION_PASSWORD_ERRORS:
      return merge({}, state, { password: [] });
      //return { ...state, password: [] };
    default:
      return state;
  }
};

export default sessionErrorsReducer;
