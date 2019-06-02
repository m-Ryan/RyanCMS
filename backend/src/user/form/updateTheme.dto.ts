import { Model } from '../../common/model';
import _ from 'lodash';
export class UpdateThemeDto extends Model {
	music: string = undefined;
	color: string = undefined;

	constructor(data: UpdateThemeDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			color: '主题色',
			music: '主题音乐'
		};
	}

	rules() {
		return [ [ [ 'color', 'music' ], 'selectable', 'string' ] ];
	}
}
