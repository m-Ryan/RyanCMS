import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import lessParser from 'postcss-less';
import axios from 'axios';
require('css-modules-require-hook')({
	generateScopedName: '[path][name]__[local]',
	extensions: [ '.css', '.less', '.scss' ],
	processorOpts: { parser: lessParser.parse }
});
import Router from 'koa-router';
import { renderFullPage } from './renderFullPage';
const router = new Router();
const app = new Koa();
app.use(bodyParser());
app.use(
	require('koa-static')(process.cwd() + '/build', {
		maxage: 365 * 60 * 60 * 24
	})
);

router.all('/api/*', async (ctx: Koa.ParameterizedContext<{}, Router.IRouterContext>, next) => {
	const method = ctx.request.method;
	const headers = ctx.request.header;
	const url = ctx.request.url.replace(/^\/api/, 'http://localhost:8080');
	const data = ctx.request.body;
	try {
		const res = await axios({
			url,
			method,
			headers,
			data
		});
		ctx.body = res.data;
	} catch (error) {
		ctx.throw(error.response.data.status, error.response.data.message);
	}
});

router.post('/api/*', async (ctx, next) => {
	const method = ctx.request.method;
	const headers = ctx.request.header;
	const url = ctx.request.url.replace(/^\/api/, 'http://localhost:8080');
	const data = ctx.req;
	try {
		const res = await axios(url, {
			method,
			headers
		});
		ctx.body = res.data;
	} catch (error) {
		ctx.throw(error.response.data.status, error.response.data.message);
	}
});

router.get('*', async (ctx) => {
	const renderPage = await renderFullPage(ctx.req.url as string);
	ctx.type = 'html';
	ctx.body = renderPage;
});

app.use(router.routes()); // 这个必须在 hook 后面导入
app.listen(3100);
console.log('server running on port 3100');
