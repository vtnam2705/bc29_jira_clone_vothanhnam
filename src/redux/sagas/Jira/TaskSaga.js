import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { createTaskService } from '../../../services/CreateTaskService';
import { deleteTaskService } from '../../../services/DeleteTaskService';
import { getAllPriorityService } from '../../../services/GetAllPriorityService';
import { getAllStatusService } from '../../../services/GetAllStatusService';
import { getAllTaskTypeService } from '../../../services/GetAllTaskTypeService';
import { getUserByProjectIdService } from '../../../services/GetUserByProjectIdService';
import { insertCommentService } from '../../../services/InsertCommentService';
import { taskService } from '../../../services/TaskService';
import { updateStatusTaskService } from '../../../services/UpdateStatusTaskService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK_SAGA,
  DELETE_COMMENT_SAGA,
  DELETE_TASK_SAGA,
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE,
  GET_TASK_DETAIL_SAGA,
  GET_USER_BY_PROJECT_ID,
  HANDLE_CHANGE_POST_API_SAGA,
  HIDE_MODAL,
  INSERT_COMMENT_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from '../../constants/Jira/Jira';
import { deleteCommentService } from './../../../services/DeleteCommentService';
import { getTaskDetailService } from './../../../services/GetTaskDetailService';
import { notifiFunction } from './../../../util/Notification/NotificationJira';
import {
  GET_ALL_TASK_TYPE_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  GET_TASK_DETAIL,
  GET_USER_BY_PROJECT_ID_SAGA,
} from './../../constants/Jira/Jira';

//Get all status
function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => getAllStatusService.getAllStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS,
        arrStatus: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* theoDoiGetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}

//Get all priority

function* getAllPriority(action) {
  try {
    const { data, status } = yield call(() => getAllPriorityService.getAllPriority());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY,
        arrPriority: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetAllPriority() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}

//get all task type

function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() => getAllTaskTypeService.getAllTaskType());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TASK_TYPE,
        arrTaskType: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}
export function* theoDoiGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}

//get user by project id

function* getUserByProjectId(action) {
  try {
    const { data, status } = yield call(() => getUserByProjectIdService.getUserByProjectId(action.idProject));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectId);
}

//create task saga

function* createTask(action) {
  yield delay(500);
  try {
    const { data, status } = yield call(() => createTaskService.createTask(action.taskObject));
    console.log('data', data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: HIDE_MODAL,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: data.content.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: data.content.taskId,
      });
      notifiFunction('success', 'Create task successfully');
    }
    console.log('data', data);
  } catch (error) {
    notifiFunction('error', error.response.data.content);
  }
}

export function* theoDoiCreateTask() {
  yield takeLatest(CREATE_TASK_SAGA, createTask);
}

//get task detail

function* getTaskDetail(action) {
  try {
    const { data, status } = yield call(() => getTaskDetailService.getTaskDetail(action.taskId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        taskDetailModal: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}

//update status task

function* updateStatusTask(action) {
  try {
    const { data, status } = yield call(() => updateStatusTaskService.updateStatusTask(action.taskStatusUpdate));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.taskStatusUpdate.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskStatusUpdate.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiUpdateStatusTask() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTask);
}

//Change post api

function* handelChangePostApi(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { value, name } = action;

        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelected } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelected,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
  }

  //Save qua api updateTaskSaga
  //Lây dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần

  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  try {
    const { data, status } = yield call(() => taskService.updateTask(taskUpdateApi));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
  }
}

export function* theoDoiHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handelChangePostApi);
}

//delete task

function* deleteTask(action) {
  try {
    const { data, status } = yield call(() => deleteTaskService.deleteTask(action.taskId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskId,
      });
      notifiFunction('success', 'Delete task successfully');
    }
  } catch (error) {
    notifiFunction('error', error.response.data.message);
  }
}

export function* theoDoiDeleteTask() {
  yield takeLatest(DELETE_TASK_SAGA, deleteTask);
}

//Insert comment

function* insertComment(action) {
  console.log(action);
  try {
    const { data, status } = yield call(() => insertCommentService.insertComment(action.newComment));
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: data.content.taskId,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertComment);
}

//Delete comment

function* deleteComment(action) {
  try {
    const { data, status } = yield call(() => deleteCommentService.deleteComment(action.idComment));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.taskId,
      });
    }
  } catch (error) {
    notifiFunction('error', 'Bạn không đủ quyền xóa bình luận này!!!');
  }
}

export function* theoDoiDeleteComment() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteComment);
}
