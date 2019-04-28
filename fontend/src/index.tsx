import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { HotApp } from './router/Client';

async function bootstrap() {
	if (process.env.NODE_ENV === 'production') {
		const fundebug = await import('fundebug-javascript');
		fundebug.apikey = '422db93428b4f6f7e3c0af726bb15d09159c37700cc33ff6817a3c2bbe0be9f2';
	}

	render(HotApp, document.getElementById('root') as HTMLElement);
	serviceWorker.unregister();
}

bootstrap();
