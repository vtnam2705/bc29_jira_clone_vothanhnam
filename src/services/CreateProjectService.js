import { baseService } from './baseService';
export class CreateProjectService extends baseService {
  constructor() {
    super();
  }

  createProject = (newProject) => {
    return this.post('Project/createProjectAuthorize', newProject);
  };
}

export const createProjectService = new CreateProjectService();
