import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { createProjectService } from '../../../services/CreateProjectService';
import { getCategoryService } from '../../../services/GetCategoryService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import {
  ADD_USER_PROJECT_SAGA,
  CLOSE_DRAWER,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_CATEGORY,
  GET_PROJECT_CATEGORY_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_USER_SEARCH,
  GET_USER_SEARCH_SAGA,
  REMOVE_USER_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
} from '../../constants/Jira/Jira';
import { getAllProjectService } from './../../../services/GetAllProjectService';
import { history } from './../../../util/history';
import { notifiFunction } from './../../../util/Notification/NotificationJira';
import { GET_ALL_PROJECT } from './../../constants/Jira/Jira';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { updateProjectService } from './../../../services/UpdateProjectService';
import { deleteProjectService } from '../../../services/DeleteProjectService';
import { getUserSearchService } from '../../../services/GetUserSearchService';
import { addUserProjectService } from '../../../services/AddUserProjectService';
import { removeUserProjectService } from '../../../services/RemoveUserProjectService';
import { getProjectDetailService } from '../../../services/GetProjectDetailService';

//Get project category
function* getProjectCategory(action) {
  try {
    const { data, status } = yield call(() => getCategoryService.getCategoryProject());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_CATEGORY,
        arrCategory: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetProjectCategory() {
  yield takeLatest(GET_PROJECT_CATEGORY_SAGA, getProjectCategory);
}

//Create project
function* createProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => createProjectService.createProject(action.newProject));
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction('success', 'Create project successfully');
      history.push('/projectmanagement');
    }
  } catch (error) {
    notifiFunction('error', error.response.data.content);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}

//Get all project saga

function* getAllProject(action) {
  try {
    const { data, status } = yield call(() => getAllProjectService.getAllProject());
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetAllProject() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProject);
}

//Update project Saga

function* updateProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() => updateProjectService.updateProject(action.projectUpdate));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}

//Delete project

function* deleteProject(action) {
  try {
    const { data, status } = yield call(() => deleteProjectService.deleteProject(action.idProject));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      notifiFunction('success', 'Delete project successfully');
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiDeleteProject() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}

//Get user search

function* getUserSearch(action) {
  try {
    const { data, status } = yield call(() => getUserSearchService.getUserSearch(action.keyWord));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_SEARCH,
        arrUserSearch: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetUserSearch() {
  yield takeLatest(GET_USER_SEARCH_SAGA, getUserSearch);
}

//Add user project

function* addUserProject(action) {
  try {
    const { data, status } = yield call(() => addUserProjectService.addUserProject(action.userProject));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (error) {
    notifiFunction('error', error.response.data.message);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProject);
}

//Remove user project

function* removeUserProject(action) {
  try {
    const { data, status } = yield call(() => removeUserProjectService.removeUserProject(action.userProject));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.respose.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_SAGA, removeUserProject);
}

//get project detail

function* getProjectDetail(action) {
  try {
    const { data, status } = yield call(() => getProjectDetailService.getProjectDetail(action.projectId));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL,
        projectDetail: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* theoDoiGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}
