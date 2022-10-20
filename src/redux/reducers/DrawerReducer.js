import { CLOSE_DRAWER } from '../constants/Jira/Jira';
import { OPEN_DRAWER } from './../constants/Jira/Jira';

const initialState = {
  visible: false,
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }

    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }

    default:
      return { ...state };
  }
};
