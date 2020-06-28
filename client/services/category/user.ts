import { request } from '../axios.config';
import { ListResponse } from '@/client/types/response/list.response';
import { Category } from '@/client/types/category.interface';

interface UpdateCategory {
  category_id: number;
  name?: string;
  picture?: string;
  desc?: string;
}
export const user = {
   getList(params: {page: number, size: number}): Promise<ListResponse<Category>> {
    return request.get('/category/user/list', {
      params
    });
  },
   createCategory(postData: {name: string, picture: string, desc: string}) {
    return request.post('/category/user/create-category', postData);
  },
   deleteCategory(categoryId: number) {
    return request.get('/category/user/delete-category', {
      params: {
        category_id: categoryId,
      },
    });
  },

   updateCategory(data: UpdateCategory) {
    return request.post('/category/user/update-category', data);
  }
}
