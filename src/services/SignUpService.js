import { baseService } from './baseService';

export class SignUpService extends baseService {
  constructor() {
    super();
  }

  signUpUser = (newUser) => {
    return this.post('/Users/signup', newUser);
  };

  getListUser = (listUser) => {
    return this.get('/Users/getUser', listUser);
  };

  deleteUserSignUp = (idUser) => {
    return this.delete(`Users/deleteUser?id=${idUser}`);
  };

  updateUserSignUp = (user) => {
    return this.put('Users/editUser', user);
  };

  getUserSignUpSearch = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };
}

export const signUpService = new SignUpService();
