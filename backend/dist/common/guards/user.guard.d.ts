import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/index';
export declare class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
