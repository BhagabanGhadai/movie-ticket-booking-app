import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "./auth.interface";
import { Types } from "mongoose";

@Injectable()
export class AuthHelper {
constructor(private readonly jwtService:JwtService){}

async buildJwtPayload(userId:Types.ObjectId,tokenVersion:number):Promise<IJwtPayload>{
    return {
        sub:userId.toString(),
        version:tokenVersion,
        iat:Math.floor(Date.now()/1000),
        exp:Math.floor(Date.now()/1000)+60*60*24*7
    }
}

async generateToken(user:any):Promise<string>{
    return this.jwtService.sign(user)
}

async verifyToken(token:string):Promise<any>{
    return this.jwtService.verify(token)
}

async decodeToken(token:string):Promise<any>{
    return this.jwtService.decode(token)
}
}