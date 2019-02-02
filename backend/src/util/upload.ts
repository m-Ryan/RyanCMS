import fs from 'fs';
import path from 'path';
import { UserError } from '../common/filters/userError';
const UPLOAD_DIR = 'upload';
export class Upload {
  static async writeImage(file: any) {
    const name = new Date().getTime() + file.originalname;
    const dir = path.join(process.cwd(), 'public', UPLOAD_DIR);
    const url = path.join(UPLOAD_DIR, name);
    const fileName = path.join(dir, name);
    const existDir = await new Promise(resolve => fs.exists(dir, resolve));
    if (!existDir) {
      const error = await new Promise(resolve => fs.mkdir(dir, resolve));
      if (error) {
        throw new UserError('创建上传目录失败');
      }
    }
    return new Promise(resolve => {
      return fs.writeFile(fileName, file.buffer, err => {
        if (err) {
          console.log(err);
          throw new UserError('写入图片失败');
        }
        resolve(url);
      });
    });
  }
}
