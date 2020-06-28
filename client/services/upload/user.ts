import Axios from 'axios';
import { request } from '../axios.config';
import { getCookie } from '@/client/utils/tools';
export interface QiNiuConfig {
  origin: string;
  token: string;
}
interface QiNiuResponse {
  key: string;
  hash: string;
}
const QI_NIUI_KEY = 'qiniuConfig';
export const  user =  {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    const qiniuCookie = getCookie(QI_NIUI_KEY); // 有cookie先拿cookie
    let qiniuConfig: QiNiuConfig;
    if (qiniuCookie) {
      qiniuConfig = JSON.parse(qiniuCookie);
    } else {
      qiniuConfig = await request.get<QiNiuConfig>(
          '/upload/user/qiniu-token'
      );
      document.cookie = `${QI_NIUI_KEY}=${JSON.stringify(
          qiniuConfig
      )}; max-age=540;`; // 设置十分钟有效期
    }
    const { token, origin } = qiniuConfig;
    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    const res = await request.post<{ key: string }>(
        'http://upload.qiniu.com',
        data
    );
    return origin + '/' + res.key;
  },
}
