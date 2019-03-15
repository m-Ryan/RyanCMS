import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { SSR } from '../router/SSR';
import { createStore } from 'ryan-redux';
import BlogRouter from '../controller/blog/router/BlogRouter';
import { ServerData } from '../interface/serverData.interface';
import model from '../model';
export const renderFullPage = async (url: string) => {
	try {
		let serverData: ServerData = { title: 'RyanCMS 内容管理系统', props: {} };
		if (/^\/u\/.+/.test(url)) {
			if (typeof BlogRouter.initServerData === 'function') {
				serverData = await BlogRouter.initServerData(decodeURIComponent(url));
			}
		}

		const store = createStore(model, serverData.props);
		const myHtml = fs.readFileSync(process.cwd() + '/build/index.html', 'utf-8');
		let component = SSR(url, store) as any;
		let html = ReactDOMServer.renderToString(component);
		let initJs = process.cwd() + '/build/init_state.js';
		await new Promise((resolve) =>
			fs.writeFile(initJs, `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`, () => resolve())
		);
		let initStateJs = `<script src="/init_state.js?${new Date().getTime()}"></script>`;
		return myHtml
			.replace(/(\<div\s+id\="root"\>)(.|\n|\r)*(\<\/div\>)/i, '$1' + html + '$3' + initStateJs)
			.replace(/(\<title\>)(.*)?(\<\/title\>)/, '$1' + serverData.title + '$3');
	} catch (error) {
		return error.message;
	}
};
