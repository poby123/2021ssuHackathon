import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SessionGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const session = req.session;

        if (session && session.userId) {
            return true;
        }

        throw new UnauthorizedException();
    }
}