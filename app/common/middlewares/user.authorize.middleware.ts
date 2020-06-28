import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { UserEntity } from '../../module/user/entities/user.entity';
import { NextFunction } from 'express';


@Injectable()
export class UserAuthorizeMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (authorization) {
      const token = authorization.replace('Ryan ', '');
      try {
        req.headers['auth'] = UserEntity.verify(token);
      } catch (error) {
        //
      }
    }
    next();
  }

}
