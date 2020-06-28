import { Model } from '../../../common/model';
import _ from 'lodash';
export class UpdateCategoryDto extends Model {
  category_id: number = undefined;
  name?: string = undefined;
  picture?: string = undefined;
  desc?: string = undefined;

  constructor(data: UpdateCategoryDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      category_id: '栏目id',
      name: '标题',
      desc: '描述',
      picture: '图片',
    };
  }

  rules() {
    return [[['name', 'picture', 'desc'], 'selectable', 'string']];
  }
}
