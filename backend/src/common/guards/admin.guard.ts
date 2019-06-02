import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs/index';
import { ADMIN_RANK } from '../constant/User';
import { Auth } from '../interface/Auth';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth: Auth = req.headers.auth;
    return (auth && auth.rank) >= ADMIN_RANK;
  }
}
