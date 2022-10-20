import { baseService } from './baseService';
export class GetUserSearchService extends baseService {
  constructor() {
    super();
  }

  getUserSearch = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };
}

export const getUserSearchService = new GetUserSearchService();
