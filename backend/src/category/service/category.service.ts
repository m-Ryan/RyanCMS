import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../entities/category.entity';
import { CreateCategoryDto } from '../form/create_category.dto';
import { UpdateCategoryDto } from '../form/update_category.dto';
@Injectable()
export class CategoryService {
  constructor() {}

  createCategory(createCategoryDto: CreateCategoryDto, userId: number) {
    return CategoryEntity.createCategory(createCategoryDto, userId);
  }

  updateCategory(updateCategoryDto: UpdateCategoryDto, userId: number) {
    return CategoryEntity.updateCategory(updateCategoryDto, userId);
  }

  daleteCategory(tagId: number, userId: number) {
    return CategoryEntity.deleteCategory(tagId, userId);
  }

  getList(page: number, size: number, userId: number) {
    return CategoryEntity.getList(page, size, userId);
  }
}
