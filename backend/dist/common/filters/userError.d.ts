import { HttpException } from '@nestjs/common';
export declare class UserError extends HttpException {
    constructor(response: string, status?: number);
}
