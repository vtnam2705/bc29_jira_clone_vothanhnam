import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, useHistory } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import CreateProject from './pages/Jira/CreateProject/CreateProject';
import LoginJira from './pages/Jira/LoginJira/LoginJira';
import ProjectManagement from './pages/Jira/ProjectManagement/ProjectManagement';
import SignUpJira from './pages/Jira/SignUpJira/SignUpJira';
import Board from './redux/sagas/Jira/Board';
import IndexJira from './redux/sagas/Jira/IndexJira';
import { JiraTemplate } from './templates/HomeTemplate/JiraTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import UserManagement from './pages/Jira/UserManagement/UserManagement';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, []);

  return (
    <>
      <LoadingComponent />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <UserLoginTemplate exact path="/signup" Component={SignUpJira} />

        <UserLoginTemplate exact path="/" Component={LoginJira} />
        <JiraTemplate exact path="/jira" Component={Board} />
        <JiraTemplate exact path="/createproject" Component={CreateProject} />
        <JiraTemplate exact path="/projectmanagement" Component={ProjectManagement} />
        <JiraTemplate exact path="/usermanagement" Component={UserManagement} />
        <JiraTemplate exact path="/projectDetail/:projectId" Component={IndexJira} />
      </Switch>
    </>
  );
}

export default App;
