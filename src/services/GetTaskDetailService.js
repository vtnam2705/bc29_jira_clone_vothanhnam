import { baseService } from './baseService';
export class GetTaskDetailService extends baseService {
  constructor() {
    super();
  }

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
}

export const getTaskDetailService = new GetTaskDetailService();
