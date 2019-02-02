import { Model } from '../../common/model';
import _ from 'lodash';
export class CreateCategoryDto extends Model {
  name: string = undefined;
  picture: string = undefined;
  desc: string = undefined;

  constructor(data: CreateCategoryDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      name: '标题',
      desc: '描述',
      picture: '图片',
    };
  }

  rules() {
    return [[['name', 'picture', 'desc'], 'required']];
  }
}
