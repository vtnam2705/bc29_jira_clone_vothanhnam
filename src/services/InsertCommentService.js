import { baseService } from './baseService';
export class InsertCommentService extends baseService {
  constructor() {
    super();
  }

  insertComment = (newComment) => {
    return this.post('Comment/insertComment', newComment);
  };
}

export const insertCommentService = new InsertCommentService();
