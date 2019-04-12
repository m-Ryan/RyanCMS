import { Injectable, HttpService } from '@nestjs/common';
import { take } from 'rxjs/operators';
@Injectable()
export class MapService {
	constructor(private readonly httpService: HttpService) {}

	async formatAddress(lng: number, lat: number, key: string) {
		const res = await this.httpService
			.get(`http://restapi.amap.com/v3/geocode/regeo?key=${key}&location=${lng},${lat}`)
			.pipe(take(1))
			.toPromise();
		return res.data;
	}
}
