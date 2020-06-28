import {
  Controller,
  Get,
  Query,
  Headers,
  UseGuards,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { CategoryService } from '../service/category.service';
import { UserGuard } from '../../../common/guards/user.guard';
import { Auth } from '../../../common/interface/Auth';
import { SuccessResponse } from '../../../common/filters/successResponse';
import { UpdateCategoryDto } from '../form/update_category.dto';
import { CreateCategoryDto } from '../form/create_category.dto';

@Controller('category/user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post('/create-category')
  async createCategory(
    @Body() crateCategoryDto: CreateCategoryDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new CreateCategoryDto(crateCategoryDto);
    await data.validate();
    return this.categoryService.createCategory(data, auth.user_id);
  }

  @Get('/list')
  async getList(
    @Headers('auth') auth: Auth,
    @Query('page', new ParseIntPipe()) page: number,
    @Query('size', new ParseIntPipe()) size: number,
  ) {
    return this.categoryService.getList(page, size, auth.user_id);
  }

  @UseGuards(UserGuard)
  @Get('/delete-category')
  async daleteTag(
    @Query('category_id') categoryId: number,
    @Headers('auth') auth: Auth,
  ) {
    await this.categoryService.daleteCategory(categoryId, auth.user_id);
    return SuccessResponse;
  }

  @UseGuards(UserGuard)
  @Post('/update-category')
  async updateTag(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Headers('auth') auth: Auth,
  ) {
    const data = new UpdateCategoryDto(updateCategoryDto);
    await data.validate();
    return this.categoryService.updateCategory(data, auth.user_id);
  }
}
