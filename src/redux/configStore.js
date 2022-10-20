import { applyMiddleware, combineReducers, createStore } from 'redux';
//middleware saga
import createMiddleWareSaga from 'redux-saga';
import reduxThunk from 'redux-thunk';
import LoadingReducer from './reducers/LoadingReducer';
import { UserLoginJiraReducer } from './reducers/UserJiraReducer';
import { rootSaga } from './sagas/rootSaga';
import { ProjectReducer } from './reducers/ProjectReducer';
import { DrawerReducer } from './reducers/DrawerReducer';
import { TaskReducer } from './reducers/TaskReducer';
import { SignUpReducer } from './reducers/SignUpReducer';

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //reducer khai báo tại đây
  LoadingReducer,
  UserLoginJiraReducer,
  ProjectReducer,
  DrawerReducer,
  TaskReducer,
  SignUpReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);

export default store;
