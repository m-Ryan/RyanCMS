import { Model } from '../../common/model';
export class UpdateJsonDto extends Model {
  id: number = undefined;
  content: string = undefined;

  constructor(data: UpdateJsonDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      id: 'id',
      content: '内容',
    };
  }

  rules() {
    return [[['id', 'content'], 'required']];
  }
}
