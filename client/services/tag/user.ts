import { request } from '../axios.config';
import { ListResponse } from '@/client/types/response/list.response';
import { Tag } from '@/client/types/tag.interface';

interface UpdateTag {
  tag_id: number;
  name?: string;
  picture?: string;
  desc?: string;
}

export const user = {
  createTag(postData: { name: string, picture: string, desc: string; }) {
    return request.post('/tag/user/create-tag', postData);
  },
  updateTag(data: UpdateTag) {
    return request.post('/tag/user/update-tag', data);
  },
  deleteTag(tagId: number) {
    return request.get('/tag/user/delete-tag', {
      params: {
        tag_id: tagId,
      },
    });
  },
  getList(params: { page: number, size: number; }): Promise<ListResponse<Tag>> {
    return request.get('/tag/user/list', {
      params
    });
  }
};
