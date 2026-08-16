import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean>{
       const request = context.switchToHttp().getRequest();
       const authHeader = request.headers.authorization;
       if(!authHeader){
        throw new UnauthorizedException("Authentication required");
       }
       const headerArray = authHeader.split(" ");
       if(headerArray.length !== 2){
        throw new UnauthorizedException("Invalid Token");
       }
        const tokenType = headerArray[0];
        const token = headerArray[1];
        if(tokenType !== "Bearer"){
            throw new UnauthorizedException("Invalid Token Type");
        }
        try{
            
        }catch(error){
            throw new UnauthorizedException("Invalid Token");
        }
        return true
    }
}