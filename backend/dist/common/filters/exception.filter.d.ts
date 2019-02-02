import { ArgumentsHost, ExceptionFilter as Filter, HttpException } from '@nestjs/common';
export declare class ExceptionFilter implements Filter {
    catch(exception: Error | HttpException, host: ArgumentsHost): any;
}
