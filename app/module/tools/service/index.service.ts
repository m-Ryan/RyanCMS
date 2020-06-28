import { Injectable, HttpService } from '@nestjs/common';
import _ from 'lodash';
import { json2ts } from 'json-ts';
import { JsonEntity } from '../controller/entities/json.entity';
@Injectable()
export class ToolsService {
	constructor(private readonly httpService: HttpService) { }

	async getJsonToTs(data: string) {
		return json2ts(data);
	}

	async addJson(mod: string, name: string, content: string) {
		return JsonEntity.addJson(mod, name, content);
	}

	async updateJson(id: number, content: string) {
		return JsonEntity.updateJson(id, content);
	}

	async deleteJson(id: number) {
		return JsonEntity.deleteJson(id);
	}

	async getJson(id: number) {
		return JsonEntity.getJson(id);
	}

	async getJsonList(page: number, size: number) {
		return JsonEntity.getJsonList(page, size);
	}
}
