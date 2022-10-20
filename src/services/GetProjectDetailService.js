import { baseService } from './baseService';
export class GetProjectDetailService extends baseService {
  constructor() {
    super();
  }

  getProjectDetail = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}

export const getProjectDetailService = new GetProjectDetailService();
