import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Next,
  Headers,
  UseGuards,
  ParseIntPipe,
  Req,
  Request,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
} from '@nestjs/common';
import { UserGuard } from '../../common/guards/user.guard';
import { Auth } from '../../common/interface/Auth';
import { UploadService } from '../service/upload.service';
import { UserError } from '../../common/filters/userError';
import { Upload } from '../../util/upload';
import qiniu from 'qiniu';
@Controller('upload/user')
export class UserController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/image')
  updateTag(@UploadedFile() file: any, @Headers('auth') auth: Auth) {
    if (file.size > 2 * 1024 * 1024) {
      throw new UserError('上传图片不能大于2M');
    }
    return Upload.writeImage(file);
  }

  @UseGuards(UserGuard)
  @Get('/qiniu-token')
  getQiuNiuToken() {
    const accessKey = '2WAZdi48g5fLK3645nwy8FEb5_XaqYooOhh35AuG';
    const secretKey = 'XIKjs-HKSEiOusWztCRQ565KvDAcQRxHtY5ZO_xh';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const options = {
      scope: 'mryan',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return {
      token: uploadToken,
      origin: 'http://assets.maocanhua.cn',
    };
  }
}
