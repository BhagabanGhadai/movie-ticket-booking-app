import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(isPublic)
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException("Authentication required");
        }
        const headerArray = authHeader.split(" ");
        if (headerArray.length !== 2) {
            throw new UnauthorizedException("Invalid Token");
        }
        const tokenType = headerArray[0];
        const token = headerArray[1];
        if (tokenType !== "Bearer") {
            throw new UnauthorizedException("Invalid Token Type");
        }
        try {
            
        } catch (error) {
            throw new UnauthorizedException("Invalid Token");
        }
        return true;
    }
}