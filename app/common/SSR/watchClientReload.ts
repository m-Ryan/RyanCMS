import chokidar from 'chokidar';
import path from 'path';
import { clearModuleCache } from './clearModuleCache';
import chalk from 'chalk';
import dayjs from 'dayjs';

export function watchClientReload() {
  console.log(`${chalk.blue('[watchClientReload start]  - ')} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
  chokidar
    .watch([path.join(process.cwd(), 'client')])
    .on('change', () => {
      clearModuleCache('app/common/SSR/renderFullPage');
      console.log(`${chalk.green('[Client hot reload]  - ')} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
    });
}