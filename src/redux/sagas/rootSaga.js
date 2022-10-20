import { all } from 'redux-saga/effects';
import * as Jira from './Jira/UserJiraSaga';
import * as ProjectJiraSaga from './Jira/ProjectJiraSaga';
import * as TaskSaga from './Jira/TaskSaga';
import * as SignUpSaga from './Jira/SignUpSaga';

export function* rootSaga() {
  yield all([
    Jira.theoDoiSignin(),
    ProjectJiraSaga.theoDoiGetProjectCategory(),
    ProjectJiraSaga.theoDoiCreateProject(),
    ProjectJiraSaga.theoDoiGetAllProject(),
    ProjectJiraSaga.theoDoiUpdateProject(),
    ProjectJiraSaga.theoDoiDeleteProject(),
    ProjectJiraSaga.theoDoiGetUserSearch(),
    ProjectJiraSaga.theoDoiAddUserProject(),
    ProjectJiraSaga.theoDoiRemoveUserProject(),
    ProjectJiraSaga.theoDoiGetProjectDetail(),

    TaskSaga.theoDoiGetAllStatus(),
    TaskSaga.theoDoiGetAllPriority(),
    TaskSaga.theoDoiGetAllTaskType(),
    TaskSaga.theoDoiGetUserByProjectId(),
    TaskSaga.theoDoiCreateTask(),
    TaskSaga.theoDoiGetTaskDetail(),
    TaskSaga.theoDoiUpdateStatusTask(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiDeleteTask(),
    TaskSaga.theoDoiInsertComment(),
    TaskSaga.theoDoiDeleteComment(),

    SignUpSaga.theoDoiSignUpUser(),
    SignUpSaga.theoDoiGetAllUserSignUp(),
    SignUpSaga.theoDoiDeleteUser(),
    SignUpSaga.theoDoiGetUserSearch(),
    SignUpSaga.theoDoiUpdateUserSignUp(),
  ]);
}
