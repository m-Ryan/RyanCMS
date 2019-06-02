import { Model } from '../../common/model';
import _ from 'lodash';
export class UpdateArticleDto extends Model {
	article_id: number = undefined;
	title?: string = undefined;
	content?: string = undefined;
	summary?: string = undefined;
	picture?: string = undefined;
	secret?: number = undefined;
	level?: number = undefined;
	tags?: number[] = undefined;
	category_id?: number = undefined;

	constructor(data: UpdateArticleDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			article_id: '文章id',
			title: '标题',
			content: '内容',
			summary: '摘要',
			picture: '图片',
			tags: '标签',
			secret: '是否私人',
			category_id: '标签id'
		};
	}

	rules() {
		return [
			[ [ 'article_id' ], 'required' ],
			[ [ 'title', 'content', 'summary', 'picture' ], 'selectable', 'string' ],
			[ [ 'secret', 'level' ], 'selectable', 'number' ],
			[ [ 'tags' ], 'selectable', 'array' ]
		];
	}
}
