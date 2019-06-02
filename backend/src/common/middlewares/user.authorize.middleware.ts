import {
  Injectable,
  MiddlewareFunction,
  NestMiddleware,
  HttpStatus,
} from '@nestjs/common';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class UserAuthorizeMiddleware implements NestMiddleware {
  constructor() {}

  resolve(...args: any[]): MiddlewareFunction | Promise<MiddlewareFunction> {
    return (req: any, res, next) => {
      const authorization = req.headers.authorization;
      if (authorization) {
        const token = authorization.replace('Ryan ', '');
        try {
          req.headers.auth = UserEntity.verify(token);
        } catch (error) {}
      }
      next();
    };
  }
}
