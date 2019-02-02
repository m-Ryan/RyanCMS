import { API } from './../API';
import { CategoryResponse } from '.';

export default class Visitor {
  static getList(
    page: number,
    size: number,
    userId: number,
  ): Promise<CategoryResponse> {
    return API.get('/category/visitor/list', {
      params: {
        page,
        size,
        user_id: userId,
      },
    });
  }
}
