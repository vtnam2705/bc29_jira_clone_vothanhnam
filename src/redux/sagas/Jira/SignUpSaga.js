//Sign Up
import { put } from 'redux-saga/effects';
import { DISPLAY_LOADING, HIDE_LOADING } from './../../constants/LoadingConst';
import { delay } from 'redux-saga/effects';
import { signUpService } from '../../../services/SignUpService';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { takeLatest } from 'redux-saga/effects';
import {
  DELETE_USER_SIGN_UP_SAGA,
  GET_ALL_USER_SIGNUP,
  GET_USERS_SEARCH_SAGA,
  GET_USERS_SIGN_UP_SEARCH,
  HIDE_MODAL_EDIT,
  SIGN_UP_USER_SAGA,
  UPDATE_USER_SAGA,
} from './../../constants/Jira/Jira';
import { call } from 'redux-saga/effects';
import { GET_LIST_USERS } from './../../constants/Jira/Jira';
import { history } from './../../../util/history';
import { notifiFunction } from './../../../util/Notification/NotificationJira';

function* signUpUser(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => signUpService.signUpUser(action.newUser));

    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction('success', 'Đăng kí tài khoản thành công');
      history.push('/login');
    }
  } catch (error) {
    notifiFunction('error', error.response.data.message);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignUpUser() {
  yield takeLatest(SIGN_UP_USER_SAGA, signUpUser);
}

//get all user signup

function* getAllUserSignUp(action) {
  try {
    const { data, status } = yield call(() => signUpService.getListUser());

    yield put({
      type: GET_LIST_USERS,
      arrUsers: data.content,
    });
  } catch (error) {
    // console.log(error);
    // console.log(error.response.data);
  }
}

export function* theoDoiGetAllUserSignUp() {
  yield takeLatest(GET_ALL_USER_SIGNUP, getAllUserSignUp);
}

function* deleteUser(action) {
  try {
    const { data, status } = yield call(() => signUpService.deleteUserSignUp(action.userId));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER_SIGNUP,
      });
      notifiFunction('success', 'Delete user successfully');
    }
  } catch (error) {
    notifiFunction('error', error.response.data.content);
  }
}

export function* theoDoiDeleteUser() {
  yield takeLatest(DELETE_USER_SIGN_UP_SAGA, deleteUser);
}

//Get user search

function* getUserSearch(action) {
  try {
    const { data, status } = yield call(() => signUpService.getUserSignUpSearch(action.keyWord));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USERS_SIGN_UP_SEARCH,
        userSearch: data.content,
      });
    }
  } catch (error) {
    // console.log(error);
    // console.log(error.data.content);
  }
}

export function* theoDoiGetUserSearch() {
  yield takeLatest(GET_USERS_SEARCH_SAGA, getUserSearch);
}

//Update user

function* updateUserSignUp(action) {
  try {
    const { data, status } = yield call(() => signUpService.updateUserSignUp(action.userUpdate));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER_SIGNUP,
      });
      yield put({
        type: HIDE_MODAL_EDIT,
      });
      notifiFunction('success', 'Update user successfully');
      // getAllUserSignUp()
    }
  } catch (error) {
    // console.log(error);
    // console.log(error.response.data);
  }
}

export function* theoDoiUpdateUserSignUp() {
  yield takeLatest(UPDATE_USER_SAGA, updateUserSignUp);
}
