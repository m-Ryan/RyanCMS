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
import { CategoryService } from '../service/category.service';
import { UserGuard } from '../../../common/guards/user.guard';

@Controller('category/visitor')
export class UserController {
  constructor(private readonly categoryService: CategoryService) { }

  @UseGuards(UserGuard)
  @Get('/list')
  async getList(
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
    @Query('user_id', new ParseIntPipe()) userId: number,
  ) {
    return this.categoryService.getList(page, size, userId);
  }
}
