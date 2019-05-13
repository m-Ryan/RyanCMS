import { render } from 'react-dom';
import { HotApp } from './router/Client';
import fundebug from 'fundebug-javascript';
import { isProduction } from './util/util';
async function bootstrap() {
	if (isProduction()) {
		fundebug.apikey = '422db93428b4f6f7e3c0af726bb15d09159c37700cc33ff6817a3c2bbe0be9f2';
	}

	render(HotApp, document.getElementById('root') as HTMLElement);
}

bootstrap();
