import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { OtherService } from './service/index.service';

@Module({
	imports: [ HttpModule ],
	controllers: [ UserController ],
	providers: [ OtherService ]
})
export class OtherModule {}
