import { baseService } from './baseService';
export class GetAllTaskTypeService extends baseService {
  constructor() {
    super();
  }

  getAllTaskType = () => {
    return this.get('TaskType/getAll');
  };
}

export const getAllTaskTypeService = new GetAllTaskTypeService();
