import fs from 'fs-extra';
import shelljs from 'shelljs';
import { staticDir } from '../constant/path';
import chalk from 'chalk';

export async function awaitStaticReady() {
  const isExist = fs.existsSync(staticDir);
  if (!isExist) {
    console.log(`${chalk.greenBright('[webpack build start]  -')} ${chalk.yellowBright('检测到未打包前端目录，将自动打包')}`);
    try {
      shelljs.exec('npm run build');
      console.log(`${chalk.greenBright('[webpack build end]  -')} ${chalk.yellowBright('前端目录已打包完成')}`);
    } catch (error) {
      console.log(`${chalk.redBright('[webpack build end]  -')} ${chalk.redBright('前端目录已打包失败：' + error.toString())}`);
      shelljs.exec('rimraf build');
      throw (error);
    }
  }
}