import { Model } from '../../../common/model';
import _ from 'lodash';
export class LoginDto extends Model {
  phone: string = undefined;
  password: string = undefined;

  constructor(data: LoginDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      phone: '手机号码',
      password: '密码',
    };
  }

  rules() {
    return [[['phone'], 'phone'], [['password'], 'string']];
  }
}
