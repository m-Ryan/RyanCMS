import Axios, { AxiosRequestConfig } from 'axios';
import { PROXY_PREFIX, FORBIDDEN_STATUS } from '../config/constant';
import { ArticleService } from './article';
import { UserService } from './user';
import { TagService } from './tag';
import { CategoryService } from './category';
import { CommentService } from './comment';
import { UploadService } from './upload';
import TokenStorage from '../util/TokenStorage';
import { ToolsService } from './tools';
if (typeof localStorage === 'undefined') {
	TokenStorage.getToken = () => '';
}

const post = async (url: string, data?: any, config?: AxiosRequestConfig) => {
	let defaultConfig = {
		headers: {
			authorization: TokenStorage.getToken()
		}
	};
	try {
		const result = await Axios.post(url, data, { ...defaultConfig, ...config });
		return result.data;
	} catch (error) {
		const backendError = !!error.response;
		const resError = backendError ? new Error(error.response.data.message || error.response.data) : error;
		throw resError;
	}
};

const get = async (url: string, config?: AxiosRequestConfig) => {
	let defaultConfig = {
		headers: {
			authorization: TokenStorage.getToken()
		}
	};
	try {
		const result = await Axios.get(url, { ...defaultConfig, ...config });
		return result.data;
	} catch (error) {
		const backendError = !!error.response;
		const resError = backendError ? new Error(error.response.data.message || error.response.data) : error;
		throw resError;
	}
};

Axios.defaults.baseURL = PROXY_PREFIX;
export const API = {
	post,
	get,
	user: UserService,
	tag: TagService,
	category: CategoryService,
	article: ArticleService,
	comment: CommentService,
	upload: UploadService,
	tools: ToolsService
};
