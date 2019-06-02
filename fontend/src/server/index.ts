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
import { API_HOST } from './constant';

const app = new Koa();
app.proxy = true;
app.use(bodyParser());
app.use(
	require('koa-static')(process.cwd() + '/build', {
		maxage: 365 * 60 * 60 * 24
	})
);
const router = new Router();
router.all('/api/*', async (ctx: Koa.ParameterizedContext<{}, Router.IRouterContext>, next) => {
	const method = ctx.request.method;
	const headers = ctx.request.header;
	const url = ctx.request.url.replace(/^\/api/, API_HOST);
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
		ctx.response.status = error.response.data.status || 500;
		ctx.response.body = {
			message: error.response.data.message || error.response.data
		};
	}
});

router.get('*', async (ctx) => {
	const acceptHost = ctx.request.header['accept-host'];
	const renderPage = await renderFullPage(ctx.req.url as string, acceptHost);
	ctx.type = 'html';
	ctx.body = renderPage;
});

app.use(router.routes()); // 这个必须在 hook 后面导入
app.listen(3100);
console.log('server running on port 3100');
