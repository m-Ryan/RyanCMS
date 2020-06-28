import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserGuard } from '../../../common/guards/user.guard';
import { BACKEDN_MAP_KEY } from '../constance';
import { MapService } from '../service/map.service';
@Controller('map/user')
@UseGuards(UserGuard)
export class UserController {
	constructor(private readonly service: MapService) { }

	@Get('/format-address')
	formatAddress(@Query('lng') lng: number, @Query('lat') lat: number) {
		return this.service.formatAddress(lng, lat, BACKEDN_MAP_KEY);
	}
}
