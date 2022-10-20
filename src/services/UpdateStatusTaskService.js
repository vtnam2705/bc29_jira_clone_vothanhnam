import { baseService } from './baseService';
export class UpdateStatusTaskService extends baseService {
  constructor() {
    super();
  }

  updateStatusTask = (taskStatusUpdate) => {
    return this.put(`Project/updateStatus`, taskStatusUpdate);
  };
}

export const updateStatusTaskService = new UpdateStatusTaskService();
