import { baseService } from './baseService';
export class GetAllStatusService extends baseService {
  constructor() {
    super();
  }

  getAllStatus = () => {
    return this.get('Status/getAll');
  };
}

export const getAllStatusService = new GetAllStatusService();
