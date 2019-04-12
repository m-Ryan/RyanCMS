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
export const renderFullPage = async (url: string, domain: string) => {
	try {
		let serverData: ServerData = { title: 'RyanCMS 内容管理系统', props: {} };
		if (/^\/u\/.+/.test(url)) {
			if (typeof BlogRouter.initServerData === 'function') {
				serverData = await BlogRouter.initServerData(decodeURIComponent(url));
			}
		} else if (/^\/domain\/.+/.test(url)) {
			if (typeof DomainRouter.initServerData === 'function') {
				serverData = await DomainRouter.initServerData(decodeURIComponent(url), domain);
			}
		}

		const store = createStore(model, serverData.props);
		const myHtml = fs.readFileSync(process.cwd() + '/build/index.html', 'utf-8');
		let component = SSR(url, store) as any;
		let html = ReactDOMServer.renderToString(component);
		let resData = await axios.post(API_HOST + '/upload/user/upload-qiniu-file', {
			data: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
			name: 'init_state.js'
		});
		let initStateJs = `<script src="${resData.data}?${new Date().getTime()}"></script>`;
		return myHtml
			.replace(/(\<div\s+id\="root"\>)(.|\n|\r)*(\<\/div\>)/i, '$1' + html + '$3' + initStateJs)
			.replace(/(\<title\>)(.*)?(\<\/title\>)/, '$1' + serverData.title + '$3');
	} catch (error) {
		return error.message;
	}
};
