import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Next,
  Headers,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { Service } from '../service/index.service';
import { Auth } from '../../../common/interface/Auth';
import { SuccessResponse } from '../../../common/filters/successResponse';
import { CreatePicturesDto } from '../form/create_picture.dto';
import { UserError } from '../../../common/filters/userError';
import _ from 'lodash';

@Controller('picture/user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly service: Service) {}

  @Get('/list')
  async getList(
    @Headers('auth') auth: Auth,
    @Query('page', new ParseIntPipe())
    page: number = 1,
    @Query('size', new ParseIntPipe())
    size: number = 10
  ) {
    return this.service.getList(page, size, auth.user_id);
  }

  @Post('/create-pictures')
  async createAlbumPhotos(
    @Body() createPhotosDto: CreatePicturesDto,
    @Headers('auth') auth: Auth
  ) {
    const data = new CreatePicturesDto(createPhotosDto);
    await data.validate();
    return this.service.createPhotos(data, auth.user_id);
  }

  @Get('/get-list')
  async getPhotoList(
    @Headers('auth') auth: Auth,
    @Query('page', new ParseIntPipe())
    page: number = 1,
    @Query('size', new ParseIntPipe())
    size: number = 10
  ) {
    return this.service.getList(page, size, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Post('/delete-pictures')
  async deletePhotos(
    @Body('picture_ids') pictureIds: number[],
    @Headers('auth') auth: Auth
  ) {
    if (pictureIds.length === 0) {
      throw new UserError('至少需要一个id');
    }
    pictureIds.forEach((item) => {
      if (!_.isInteger(item)) {
        throw new UserError('参数有误');
      }
    });
    await this.service.deletePhotos(pictureIds, auth.user_id);
    return SuccessResponse;
  }
}
