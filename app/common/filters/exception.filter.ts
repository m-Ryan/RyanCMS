import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SSR } from '@/app/common/SSR';

const docType = ['text/html', ',application/xhtml+xml', 'application/xml'];

@Catch(HttpException, Error)
export class ExceptionFilter implements Filter {
  async catch(
    exception: Error | HttpException,
    host: ArgumentsHost
  ): Promise<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // render document page
    if (
      request.headers.accept &&
      docType.some((type) => request.headers.accept.includes(type)) &&
      status === 404
    ) {
      return SSR(request, response);
    }
    const message = exception.message;
    response.status(status).send({ message, status });
  }
}
