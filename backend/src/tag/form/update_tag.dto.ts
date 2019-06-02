import { Model } from '../../common/model';
import _ from 'lodash';
export class UpdateTagDto extends Model {
  tag_id: number = undefined;
  name?: string = undefined;
  picture?: string = undefined;
  desc?: string = undefined;

  constructor(data: UpdateTagDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      tag_id: '标签id',
      name: '标题',
      desc: '描述',
      picture: '图片',
    };
  }

  rules() {
    return [[['name', 'picture', 'desc'], 'selectable', 'string']];
  }
}
