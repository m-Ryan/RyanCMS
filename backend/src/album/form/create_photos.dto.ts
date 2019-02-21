import { Model } from '../../common/model';
import _ from 'lodash';
export class CreatePhotosDto extends Model {
	album_name: string = undefined;
	photos: string[] = undefined;

	constructor(data: CreatePhotosDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			album_name: '相册名称',
			photos: '图片集合'
		};
	}

	rules() {
		return [
			[ [ 'album_name' ], 'string' ],
			[
				[ 'photos' ],
				() => {
					if (!this.photos.every((url) => _.isString(url) && !!url)) {
						return '格式错误';
					}
				}
			]
		];
	}
}
