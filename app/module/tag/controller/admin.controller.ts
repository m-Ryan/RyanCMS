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
import { TagService } from '../service/tag.service';
@Controller('tag/admin')
export class AdminController {
  constructor(private readonly tagService: TagService) {}
}
