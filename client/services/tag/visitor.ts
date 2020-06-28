import { Tag } from '@/client/types/tag.interface';
import { request } from '../axios.config';
import { ListResponse } from '@/client/types/response/list.response';
import { NumberString } from '@/client/types/NumberString.interface';

export const visitor = {
  getList(params: {
    page: NumberString,
    size: NumberString,
    user_id: number
  }): Promise<ListResponse<Tag>> {
    return request.get('/tag/visitor/list', {
      params
    });
  },
  getTag(userId: number, name: string): Promise<Tag> {
    return request.get('/tag/visitor/info', {
      params: {
        user_id: userId,
        name,
      },
    });
  }
};
