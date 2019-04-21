import { Injectable, HttpService } from '@nestjs/common';
import _ from 'lodash';
import { json2ts } from 'json-ts';
@Injectable()
export class ToolsService {
	constructor(private readonly httpService: HttpService) {}

	async getJsonToTs(data: string) {
		return json2ts(data);
	}
}
