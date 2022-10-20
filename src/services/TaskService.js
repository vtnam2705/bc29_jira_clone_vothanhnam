import { baseService } from './baseService';

export class TaskService extends baseService {
  constructor() {
    super();
  }

  updateTask = (taskUpdate) => {
    return this.post('/Project/updateTask', taskUpdate);
  };
}

export const taskService = new TaskService();
