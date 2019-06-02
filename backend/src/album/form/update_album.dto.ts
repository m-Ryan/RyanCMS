import { Model } from '../../common/model';
import _ from 'lodash';
export class UpdateAlbumDto extends Model {
	album_id: number = undefined;
	name?: string = undefined;
	picture?: string = undefined;
	desc?: string = undefined;
	secret?: number = undefined;

	constructor(data: UpdateAlbumDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			album_id: '栏目id',
			name: '标题',
			desc: '描述',
			picture: '图片',
			secret: '是否私密'
		};
	}

	rules() {
		return [ [ [ 'name', 'picture', 'desc' ], 'selectable', 'string' ], [ [ 'secret' ], 'selectable', 'number' ] ];
	}
}
