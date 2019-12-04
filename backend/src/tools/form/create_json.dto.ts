import { Model } from '../../common/model';
export class CreateJsonDto extends Model {
  mod: string = undefined;
  name: string = undefined;
  content: string = undefined;

  constructor(data: CreateJsonDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      mod: '模块',
      content: '内容',
      name: '名称',
    };
  }

  rules() {
    return [[['mod', 'content', 'name'], 'required']];
  }
}
