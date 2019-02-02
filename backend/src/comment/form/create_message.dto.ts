import { Model } from '../../common/model';
export class CreateMessageDto extends Model {
  content: string = undefined;
  comment_id?: number = undefined;

  constructor(data: CreateMessageDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      content: '内容',
      comment_id: 'comment_id',
    };
  }

  rules() {
    return [[['content', 'comment_id'], 'required']];
  }
}
