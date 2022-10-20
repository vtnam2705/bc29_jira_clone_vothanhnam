import { USER_SIGNIN_API } from '../constants/Jira/Jira';

export const singinJiraAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
