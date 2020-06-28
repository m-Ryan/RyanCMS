import { Model } from '../../../common/model';
import _ from 'lodash';
export class CreateArticleDto extends Model {
  title: string = undefined;
  content: string = undefined;
  summary: string = undefined;
  picture: string = undefined;
  tags: number[] = undefined;
  secret: number = undefined;
  category_id: number = undefined;

  constructor(data: CreateArticleDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      title: '标题',
      content: '内容',
      summary: '摘要',
      picture: '图片',
      tags: '标签',
      secret: '是否私人',
      category_id: '文章类型',
    };
  }

  rules() {
    return [
      [['title', 'content', 'summary', 'picture'], 'string'],
      [['tags'], 'array'],
      [['secret'], 'number'],
      [['category_id'], 'required'],
    ];
  }
}
