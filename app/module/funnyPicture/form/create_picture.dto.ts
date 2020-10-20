import { Model } from '../../../common/model';
import _ from 'lodash';
export class CreatePicturesDto extends Model {
  pictures: { url: string; title: string }[] = undefined;

  constructor(data: CreatePicturesDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      pictures: '图片集合',
    };
  }

  rules() {
    return [
      [
        ['pictures'],
        () => {
          if (
            this.pictures.some((picture) => {
              return _.isEmpty(picture.title) || _.isEmpty(picture.url);
            })
          ) {
            return '格式错误';
          }
        },
      ],
    ];
  }
}
