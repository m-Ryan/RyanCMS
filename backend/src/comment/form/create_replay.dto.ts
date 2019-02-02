import { Model } from '../../common/model';
export class CreateReplayDto extends Model {
  content: string = undefined;
  message_id: number = undefined;

  constructor(data: CreateReplayDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      content: '内容',
      message_id: '楼层id',
    };
  }

  rules() {
    return [[['content', 'message_id'], 'required']];
  }
}
