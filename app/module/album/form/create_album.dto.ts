import { Model } from '../../../common/model';
import _ from 'lodash';
export class CreateAlbumeDto extends Model {
	name: string = undefined;
	desc: string = undefined;
	secret: number = undefined;
	picture: string = undefined;

	constructor(data: CreateAlbumeDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			name: '标题',
			desc: '描述',
			secret: '是否私人'
		};
	}

	rules() {
		return [[['name', 'desc', 'picture'], 'string'], [['secret'], 'number']];
	}
}
