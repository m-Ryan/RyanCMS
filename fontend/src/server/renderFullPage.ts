import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { SSR } from '../router/SSR';
import { createStore } from 'ryan-redux';
import BlogRouter from '../controller/blog/router/BlogRouter';
import { ServerData } from '../interface/serverData.interface';
import * as model from '../model';
import axios from 'axios';
import { API_HOST } from './constant';
import DomainRouter from '../controller/blog/router/DomainRouter';
const themeJson = require('../../build/theme.json');
model.themeModel.setThemeColorData(themeJson); // 初始化主题颜色
const htmlTemplete = fs.readFileSync(process.cwd() + '/build/index.html', 'utf-8');
let CACHE_ROUTE_MAP = {};

export const renderFullPage = async (url: string, domain: string) => {
	let cacheUrl = url;
	try {
		// 对路由进行缓存
		if (CACHE_ROUTE_MAP[cacheUrl]) {
			return CACHE_ROUTE_MAP[cacheUrl];
		}

		let serverData: ServerData = { title: 'RyanCMS 内容管理系统', props: {} };

		if (/^\/u\/.+/.test(url)) {
			if (typeof BlogRouter.initServerData === 'function') {
				serverData = await BlogRouter.initServerData(decodeURIComponent(url));
			}
		} else if (/^\/domain\b/.test(url)) {
			// 独立域名
			url = url.replace(/^\/domain\b/, '');
			if (typeof DomainRouter.initServerData === 'function') {
				serverData = await DomainRouter.initServerData(url, domain);
			}
		}

		const store = createStore(model, serverData.props);
		let component = SSR(url, store) as any;
		let html = ReactDOMServer.renderToString(component);

		// 初始化props文件
		const jsFecth = axios.post(API_HOST + '/upload/user/upload-qiniu-file', {
			data: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
			name: 'init_state.js'
		});

		// 初始化css文件
		let cssFetch: any = null;
		const blogger = serverData.props.bloggers && serverData.props.bloggers[0] && serverData.props.bloggers[0];
		let styleText = '';
		if (blogger && blogger.theme.color) {
			styleText = model.themeModel.getReplaceCssText([
				{ name: 'primary', color: serverData.props.bloggers![0].theme.color }
			]);
			cssFetch = axios.post(API_HOST + '/upload/user/upload-qiniu-file', {
				data: styleText,
				name: 'init_thtme.css'
			});
		}

		const [ jsResData, cssResData ] = await Promise.all([ jsFecth, cssFetch ].filter((item) => !!item));
		let initStateJs = `<script src="${jsResData.data}?${new Date().getTime()}"></script>`;
		let initStateStyle = cssResData
			? `<link rel="stylesheet" href="${cssResData.data}?${new Date().getTime()}">`
			: '';
		const renderHtml = htmlTemplete
			.replace(/(\<div\s+id\="root"\>)(.|\n|\r)*(\<\/div\>)/i, '$1' + html + '$3' + initStateStyle + initStateJs)
			.replace(/(\<title\>)(.*)?(\<\/title\>)/, '$1' + decodeURIComponent(serverData.title) + '$3');
		CACHE_ROUTE_MAP[cacheUrl] = renderHtml;
		return renderHtml;
	} catch (error) {
		// console.log(error);
		return error.message;
	}
};

export const flushCache = function(url?: string) {
	//清空全部
	if (!url) {
		CACHE_ROUTE_MAP = {};
	}

	// 清空单个路由
	if (url && CACHE_ROUTE_MAP[url]) {
		CACHE_ROUTE_MAP[url] = undefined;
	}
};
