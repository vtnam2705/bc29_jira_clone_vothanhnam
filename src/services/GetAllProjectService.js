import { baseService } from './baseService';
export class GetAllProjectService extends baseService {
  constructor() {
    super();
  }

  getAllProject = () => {
    return this.get('Project/getAllProject');
  };
}

export const getAllProjectService = new GetAllProjectService();
