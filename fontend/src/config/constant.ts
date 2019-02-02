export const TOKEN = 'RyanToken';

export const PROXY_PREFIX =
  process.env.NODE_ENV === 'development' ? '/api' : 'http://localhost:3100/api';

export const UPLOAD_IMAGE_ADDRESS = '/api/upload/user/image';

export const NOT_FOUND_PAGE = '/404';

export const QI_NIU_ADDRESS = 'http://upload.qiniu.com';
