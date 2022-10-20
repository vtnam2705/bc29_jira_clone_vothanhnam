import { baseService } from './baseService';
export class DeleteProjectService extends baseService {
  constructor() {
    super();
  }

  deleteProject = (idProject) => {
    return this.delete(`Project/deleteProject?projectId=${idProject}`);
  };
}

export const deleteProjectService = new DeleteProjectService();
