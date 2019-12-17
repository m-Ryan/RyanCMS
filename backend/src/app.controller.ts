import { Get, Controller } from '@nestjs/common';

const beginTime = new Date().toString();
@Controller('/version')
export class AppController {

  @Get()
  root() {
    return beginTime;
  }
}
