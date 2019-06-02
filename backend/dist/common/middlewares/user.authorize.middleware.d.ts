import { MiddlewareFunction, NestMiddleware } from '@nestjs/common';
export declare class UserAuthorizeMiddleware implements NestMiddleware {
    constructor();
    resolve(...args: any[]): MiddlewareFunction | Promise<MiddlewareFunction>;
}
