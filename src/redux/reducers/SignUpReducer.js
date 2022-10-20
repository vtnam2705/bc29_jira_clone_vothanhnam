import {
  EDIT_USERS,
  GET_LIST_USERS,
  GET_USERS_SIGN_UP_SEARCH,
  HIDE_MODAL_EDIT,
  SHOW_MODAL_EDIT,
} from '../constants/Jira/Jira';

const initialState = {
  arrUsers: [],

  userDetail: {},

  userSearch: [],

  isModalVisible: false,
};

export const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS: {
      return { ...state, arrUsers: action.arrUsers };
    }
    case EDIT_USERS: {
      return { ...state, userDetail: action.userEditModal };
    }

    case GET_USERS_SIGN_UP_SEARCH: {
      return { ...state, userSearch: action.userSearch };
    }

    case SHOW_MODAL_EDIT: {
      return { ...state, isModalVisible: true };
    }

    case HIDE_MODAL_EDIT: {
      return { ...state, isModalVisible: false };
    }

    default:
      return { ...state };
  }
};
