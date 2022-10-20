import { baseService } from './baseService';
export class DeleteTaskService extends baseService {
  constructor() {
    super();
  }

  deleteTask = (taskId) => {
    return this.delete(`Project/removeTask?taskId=${taskId}`);
  };
}

export const deleteTaskService = new DeleteTaskService();
