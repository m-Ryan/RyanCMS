import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException, Error)
export class ExceptionFilter implements Filter {
  catch(exception: Error | HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message;
    response.status(status).send({ message, status });
  }
}
