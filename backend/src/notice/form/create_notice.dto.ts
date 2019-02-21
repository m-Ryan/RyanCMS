import { Model } from '../../common/model';
import _ from 'lodash';
export class CreateNoticeDto extends Model {
	title: string = undefined;
	content: string = undefined;
	type: string = undefined;
	link: string = undefined;

	constructor(data: CreateNoticeDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			title: '标题',
			content: '详情',
			type: '类型'
		};
	}

	rules() {
		return [ [ [ 'title', 'content', 'type' ], 'required' ] ];
	}
}
