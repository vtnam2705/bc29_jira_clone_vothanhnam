import { EDIT_PROJECT, GET_PROJECT_CATEGORY, GET_PROJECT_DETAIL } from '../constants/Jira/Jira';
import { GET_ALL_PROJECT, GET_USER_SEARCH } from './../constants/Jira/Jira';

const initialState = {
  arrCategory: [],
  arrProject: [],
  arrProjectEdit: [],
  arrUserSearch: [],
  projectDetail: [],
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_CATEGORY: {
      return { ...state, arrCategory: action.arrCategory };
    }

    case GET_ALL_PROJECT: {
      return { ...state, arrProject: action.arrProject };
    }
    case EDIT_PROJECT: {
      return { ...state, arrProjectEdit: action.projectEditModal };
    }
    case GET_USER_SEARCH: {
      return { ...state, arrUserSearch: action.arrUserSearch };
    }
    case GET_PROJECT_DETAIL: {
      return { ...state, projectDetail: action.projectDetail };
    }

    default:
      return { ...state };
  }
};
