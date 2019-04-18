import { API } from '../API';
import Axios from 'axios';

export default class User {
	static getJsonToInterface(data: string) {
		return API.post('/tools/user/get-json-to-ts', {
			data
		});
	}
}
