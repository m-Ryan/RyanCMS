import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Next,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from '../service/article.service';
@Controller('article/admin')
export class AdminController {
  constructor(private readonly articleService: ArticleService) {}
}
