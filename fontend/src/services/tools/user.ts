import { API } from '../API';
export default class User {
	static getJsonToInterface(data: string) {
		return API.post('/tools/user/get-json-to-ts', {
			data
		});
	}
}
