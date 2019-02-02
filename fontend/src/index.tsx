import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { HotApp } from './router/Client';
render(HotApp, document.getElementById('root') as HTMLElement);
serviceWorker.unregister();
