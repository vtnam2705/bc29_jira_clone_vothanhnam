import { baseService } from './baseService';
export class DeleteCommentService extends baseService {
  constructor() {
    super();
  }

  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };
}

export const deleteCommentService = new DeleteCommentService();
