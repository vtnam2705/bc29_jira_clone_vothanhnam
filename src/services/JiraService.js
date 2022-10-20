import { baseService } from './baseService';
export class SignInService extends baseService {
  constructor() {
    super();
  }

  signInUser = (userLogin) => {
    return this.post('Users/signin', userLogin);
  };
}

export const signInService = new SignInService();
