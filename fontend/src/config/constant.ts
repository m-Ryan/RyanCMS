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

export const FORBIDDEN_STATUS = 403;

export const QI_NIU_ADDRESS = 'http://upload.qiniu.com';

export const enum ThemeColors {
	primary = '#067785',
	link = '#067785'
}

export enum HOST {
	ENV_HOST_NAME = 'localhost',
	PRODUCT_HOST_NAME = 'cms.maocanhua.cn'
}
