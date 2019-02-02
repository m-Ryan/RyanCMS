import { API } from './../API';
import { CategoryResponse } from '.';
interface UpdateCategory {
  category_id: number;
  name?: string;
  picture?: string;
  desc?: string;
}
export default class User {
  static getList(page: number, size: number): Promise<CategoryResponse> {
    return API.get('/category/user/list', {
      params: {
        page,
        size,
      },
    });
  }

  static createCategory(name: string, picture: string, desc: string) {
    return API.post('/category/user/create-category', {
      name,
      picture,
      desc,
    });
  }

  static deleteCategory(categoryId: number) {
    return API.get('/category/user/delete-category', {
      params: {
        category_id: categoryId,
      },
    });
  }

  static updateCategory(data: UpdateCategory) {
    return API.post('/category/user/update-category', data);
  }
}
