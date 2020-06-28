import { Controller } from '@nestjs/common';
import { CategoryService } from '../service/category.service';
@Controller('category/admin')
export class AdminController {
  constructor(private readonly categoryService: CategoryService) {}
}
