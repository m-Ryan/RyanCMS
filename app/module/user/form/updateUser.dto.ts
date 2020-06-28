import { Model } from '../../../common/model';
import _ from 'lodash';
export class UpdateUserDto extends Model {
	nickname: string = undefined;
	phone: string = undefined;
	password: string = undefined;
	sex: number = undefined;
	intro: string = undefined;
	avatar: string = undefined;
	github: string = undefined;
	email: string = undefined;
	weibo: string = undefined;
	zhihu: string = undefined;
	domain: string = undefined;

	constructor(data: UpdateUserDto) {
		super();
		super.setAttributes(data);
	}

	attributeLabels() {
		return {
			nickname: '昵称',
			phone: '手机号码',
			password: '密码',
			sex: '性别',
			intor: '简介',
			github: 'github',
			email: '邮我',
			zhihu: '知乎',
			weibo: '微博',
			domain: '独立域名'
		};
	}

	rules() {
		return [[['phone'], 'phone'], [['nickname'], 'required']];
	}
}
