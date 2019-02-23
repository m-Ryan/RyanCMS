import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { MapService } from './service/map.service';

@Module({
	imports: [ HttpModule ],
	controllers: [ UserController ],
	providers: [ MapService ]
})
export class MapModule {}
