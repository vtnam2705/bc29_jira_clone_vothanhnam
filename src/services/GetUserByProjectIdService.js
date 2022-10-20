import { baseService } from './baseService';
export class GetUserByProjectIdService extends baseService {
  constructor() {
    super();
  }

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const getUserByProjectIdService = new GetUserByProjectIdService();
