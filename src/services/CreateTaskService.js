import { baseService } from './baseService';
export class CreateTaskService extends baseService {
  constructor() {
    super();
  }

  createTask = (taskObject) => {
    return this.post('Project/createTask', taskObject);
  };
}

export const createTaskService = new CreateTaskService();
