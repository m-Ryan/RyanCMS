import { request } from '../axios.config';

export const user = {
  getJsonToInterface(data: string):Promise<string> {
    return request.post('/tools/user/get-json-to-ts', {
      data,
    });
  }
}