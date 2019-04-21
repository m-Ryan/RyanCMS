import { API } from '../API';
import Axios from 'axios';

export default class User {
	static getJsonToInterface(data: string) {
		return API.post('/tools/user/get-json-to-ts', {
			data
		});
	}

	static getPDF(data: string) {
		return API.post('/tools/user/get-pdf', {
			data
		});
	}
	static getPagePDF(url: string) {
		return API.get(`/tools/user/get-pdf-page?url=${url}`);
	}
}
