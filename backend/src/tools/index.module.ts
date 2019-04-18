import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { ToolsService } from './service/index.service';

@Module({
	imports: [ HttpModule ],
	controllers: [ UserController ],
	providers: [ ToolsService ]
})
export class ToolsModule {}
