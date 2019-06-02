import { Injectable } from '@nestjs/common';
import { TagEntity } from '../entities/tag.entity';
import { CreateTagDto } from '../form/create_tag.dto';
import { UpdateTagDto } from '../form/update_tag.dto';
import { UserError } from '../../common/filters/userError';
@Injectable()
export class TagService {
	constructor() {}

	createTag(createTagDto: CreateTagDto, userId: number) {
		if (/[\\\/]/.test(createTagDto.name)) {
			throw new UserError('标题不能包含非法字符');
		}
		return TagEntity.createTag(createTagDto, userId);
	}

	updateTag(updateTagDto: UpdateTagDto, userId: number) {
		if (/[\\\/]/.test(updateTagDto.name)) {
			throw new UserError('标题不能包含非法字符');
		}
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
