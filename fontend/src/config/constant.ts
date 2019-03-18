export const TOKEN = 'RyanToken';
let proxyPrefix = '/api';
// 服务端渲染必须要有完整的
if (process.env.NODE_SCENE === 'server') {
	proxyPrefix = 'http://localhost:3100/api';
}
if (process.env.NODE_SCENE === 'local') {
	proxyPrefix = 'http://localhost:3100/api';
}

export const PROXY_PREFIX = proxyPrefix;

export const UPLOAD_IMAGE_ADDRESS = '/api/upload/user/image';

export const NOT_FOUND_PAGE = '/404';

export const QI_NIU_ADDRESS = 'http://upload.qiniu.com';
