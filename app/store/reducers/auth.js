import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_ME_REQUEST,
  GET_ME_SUCCESS,
  GET_ME_FAILURE,
  LOGOUT_USER,
} from '@actions/auth';

const initialState = {
  isFetching: false,
  me: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GET_ME_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_ME_SUCCESS:
      return {
        ...state,
        me: action.payload,
        isFetching: false,
      };
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
    case GET_ME_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case LOGOUT_USER: {
      return {
        ...state,
        me: {},
      };
    }
    default:
      return state;
  }
};
