import { Injectable, BadRequestException, HttpService } from '@nestjs/common';
import { TagEntity } from '../entities/tag.entity';
import { CreateTagDto } from '../form/create_tag.dto';
import { Auth } from '../../common/interface/Auth';
import { UpdateTagDto } from '../form/update_tag.dto';
@Injectable()
export class TagService {
  constructor() {}

  createTag(createTagDto: CreateTagDto, userId: number) {
    return TagEntity.createTag(createTagDto, userId);
  }

  updateTag(updateTagDto: UpdateTagDto, userId: number) {
    return TagEntity.updateTag(updateTagDto, userId);
  }

  daleteTag(tagId: number, userId: number) {
    return TagEntity.deleteTag(tagId, userId);
  }

  getList(page: number, size: number, userId: number) {
    return TagEntity.getList(page, size, userId);
  }

  getTag(userId: number, name: string) {
    return TagEntity.getTag(userId, name);
  }
}
