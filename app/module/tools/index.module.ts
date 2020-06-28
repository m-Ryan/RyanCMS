import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { VisitorController } from './controller/visitor.controller';
import { ToolsService } from './service/index.service';

@Module({
	imports: [ HttpModule ],
	controllers: [ UserController, VisitorController ],
	providers: [ ToolsService ]
})
export class ToolsModule {}
