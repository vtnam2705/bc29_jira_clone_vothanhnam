import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_PRIORITY,
  GET_ALL_STATUS,
  GET_ALL_TASK_TYPE,
  GET_TASK_DETAIL,
  GET_USER_BY_PROJECT_ID,
  HIDE_MODAL,
  HIDE_MODAL_EDIT,
  REMOVE_USER_ASSIGN,
  SET_DELETE_BUTTON,
  SHOW_MODAL,
  SHOW_MODAL_EDIT,
} from '../constants/Jira/Jira';

const initialState = {
  arrStatus: [],
  arrPriority: [],
  arrTaskType: [],
  arrUser: [],
  isModalVisible: false,
  taskDetailModal: {},
  callBackSubmit: (propsValue) => {
    alert('click demo');
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS: {
      return { ...state, arrStatus: action.arrStatus };
    }
    case GET_ALL_PRIORITY: {
      return { ...state, arrPriority: action.arrPriority };
    }
    case GET_ALL_TASK_TYPE: {
      return { ...state, arrTaskType: action.arrTaskType };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    case SHOW_MODAL: {
      return { ...state, isModalVisible: true };
    }

    case HIDE_MODAL: {
      return { ...state, isModalVisible: false };
    }

    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } };
    }

    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter((us) => us.id !== action.userId)];
      return { ...state };
    }

    case SET_DELETE_BUTTON: {
      return { ...state, callBackSubmit: action.handleDeleteFunction };
    }

    default:
      return { ...state };
  }
};
