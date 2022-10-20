import { baseService } from './baseService';
export class GetAllPriorityService extends baseService {
  constructor() {
    super();
  }

  getAllPriority = () => {
    return this.get('Priority/getAll');
  };
}

export const getAllPriorityService = new GetAllPriorityService();
