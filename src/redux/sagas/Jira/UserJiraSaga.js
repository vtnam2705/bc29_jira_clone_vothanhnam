import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { signInService } from '../../../services/JiraService';
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem';
import { history } from '../../../util/history';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/Jira/Jira';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { notifiFunction } from '../../../util/Notification/NotificationJira';

//Quản lý các action saga
function* signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //Gọi api
  try {
    const { data, status } = yield call(() => signInService.signInUser(action.userLogin));

    //Lưu vào localstorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: USLOGIN,
        userLogin: data.content,
      });
    }
    notifiFunction('success', 'Đăng nhập thành công.')
    history.push('/usermanagement');
  } catch (error) {
    notifiFunction('error', error.response.data.message);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

// usermanagement