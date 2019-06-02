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
} from '@nestjs/common';
import { TagService } from '../service/tag.service';
import { UserGuard } from '../../common/guards/user.guard';
import { CreateTagDto } from '../form/create_tag.dto';
import { Auth } from '../../common/interface/Auth';
import { UpdateTagDto } from '../form/update_tag.dto';
import { SuccessResponse } from '../../common/filters/successResponse';
@Controller('tag/user')
export class UserController {
  constructor(private readonly tagService: TagService) {}

  @UseGuards(UserGuard)
  @Post('/create-tag')
  async createTag(
    @Body() crateTagDto: CreateTagDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new CreateTagDto(crateTagDto);
    await data.validate();
    return this.tagService.createTag(data, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Post('/update-tag')
  async updateTag(
    @Body() updateTagDto: UpdateTagDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new UpdateTagDto(updateTagDto);
    await data.validate();
    return this.tagService.updateTag(data, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Get('/delete-tag')
  async daleteTag(@Query('tag_id') tagId: number, @Headers('auth') auth: Auth) {
    await this.tagService.daleteTag(tagId, auth.user_id);
    return SuccessResponse;
  }

  @UseGuards(UserGuard)
  @Get('list')
  async getList(
    @Headers('auth') auth: Auth,
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
  ) {
    return this.tagService.getList(page, size, auth.user_id);
  }
}
