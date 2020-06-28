import { request } from '../axios.config';
import { ListResponse } from '@/client/types/response/list.response';
import { Category } from '@/client/types/category.interface';

export  const visitor = {
   getList(
    page: number,
    size: number,
    userId: number,
  ): Promise<ListResponse<Category>> {
    return request.get('/category/visitor/list', {
      params: {
        page,
        size,
        user_id: userId,
      },
    });
  }
}
