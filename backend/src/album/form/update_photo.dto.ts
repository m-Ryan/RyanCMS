import { Model } from '../../common/model';
import _ from 'lodash';
export class UpdatePhotoDto extends Model {
	photo_id: number = undefined;
	name: string = undefined;

	constructor(data: UpdatePhotoDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			photo_id: '照片id',
			name: '名字'
		};
	}

	rules() {
		return [ [ [ 'name' ], 'string' ], [ [ 'photo_id' ], 'number' ] ];
	}
}
