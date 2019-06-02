import { ArgumentsHost, Catch, ExceptionFilter as Filter, HttpException, Response } from '@nestjs/common';
@Catch(HttpException, Error)
export class ExceptionFilter implements Filter {
	catch(exception: Error | HttpException, host: ArgumentsHost): any {
		console.log('捕获到错误');
		console.log(exception);
		const resp = host.switchToHttp().getResponse();
		const status = exception instanceof HttpException ? exception.getStatus() : 500;
		const message = exception instanceof HttpException ? exception.message.message : exception.message;
		resp.status(status).json({ message, status });
	}
}
