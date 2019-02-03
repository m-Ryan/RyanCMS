export const TOKEN = 'RyanToken';
console.log(process.env.NODE_SCENE);
export const PROXY_PREFIX = process.env.NODE_SCENE === 'server' ? 'http://cms.maocanhua.cn/api' : '/api';

export const UPLOAD_IMAGE_ADDRESS = '/api/upload/user/image';

export const NOT_FOUND_PAGE = '/404';

export const QI_NIU_ADDRESS = 'http://upload.qiniu.com';
