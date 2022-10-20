import { baseService } from './baseService';
export class AddUserProjectService extends baseService {
  constructor() {
    super();
  }

  addUserProject = (userProject) => {
    return this.post('Project/assignUserProject', userProject);
  };
}

export const addUserProjectService = new AddUserProjectService();
