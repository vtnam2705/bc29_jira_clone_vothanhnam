import { baseService } from './baseService';
export class RemoveUserProjectService extends baseService {
  constructor() {
    super();
  }

  removeUserProject = (userProject) => {
    return this.post('Project/removeUserFromProject', userProject);
  };
}

export const removeUserProjectService = new RemoveUserProjectService();
