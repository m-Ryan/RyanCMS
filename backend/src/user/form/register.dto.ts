import { Model } from '../../common/model';
import _ from 'lodash';
export class RegisterDto extends Model {
  nickname: string = undefined;
  phone: string = undefined;
  password: string = undefined;

  constructor(data: RegisterDto) {
    super();
    super.setAttributes(data);
  }

  attributeLabels() {
    return {
      nickname: '昵称',
      phone: '手机号码',
      password: '密码',
    };
  }

  rules() {
    return [[['phone'], 'phone'], [['nickname', 'password'], 'string']];
  }
}
