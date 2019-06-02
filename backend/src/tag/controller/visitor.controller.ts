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
@Controller('tag/visitor')
export class VisitorController {
  constructor(private readonly tagService: TagService) {}

  @Get('/list')
  async getList(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Query('user_id', new ParseIntPipe()) uerId: number,
  ) {
    return this.tagService.getList(page, size, uerId);
  }
  @Get('/info')
  async getTag(
    @Query('user_id', new ParseIntPipe()) userId: number,
    @Query('name') name: string,
  ) {
    return this.tagService.getTag(userId, name);
  }
}
