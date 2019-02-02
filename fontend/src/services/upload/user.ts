import { API } from './../API';
import Axios from 'axios';
import { QI_NIU_ADDRESS } from '../../config/constant';
export interface QiNiuConfig {
  origin: string;
  token: string;
}
interface QiNiuResponse {
  key: string;
  hash: string;
}
export default class User {
  static getQiNiuConfig(): Promise<QiNiuConfig> {
    return API.get('/upload/user/qiniu-token');
  }

  static async uploadByQiniu(
    file: File | Blob,
    qiniuConfig: QiNiuConfig,
  ): Promise<string> {
    const { token, origin } = qiniuConfig;
    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    const res = (await Axios.post(QI_NIU_ADDRESS, data)) as any;
    return origin + '/' + res.data.key;
  }
}
