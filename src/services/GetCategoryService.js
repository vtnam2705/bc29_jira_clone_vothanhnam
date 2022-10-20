import { baseService } from './baseService';
export class GetCategoryService extends baseService {
  constructor() {
    super();
  }

  getCategoryProject = () => {
    return this.get('ProjectCategory');
  };
}

export const getCategoryService = new GetCategoryService();
