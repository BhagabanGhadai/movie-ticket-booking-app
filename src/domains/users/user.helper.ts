import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';
import { UserDocument } from "./user.entity";
import { CreateUserSchema } from "./user.schema";

@Injectable()
export class UserHelper{
    constructor(private configService:ConfigService){}

    private async hashString(str:string):Promise<string>{
       return bcrypt.hash(str,Number(this.configService.get<number>("BCRYPT_SALT_ROUND")))
    }

    private async compareHash(str:string,hashedStr:string):Promise<boolean>{
        return bcrypt.compare(str,hashedStr)
    }

    private generateOtp():string{
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async generateUserPayload(user:CreateUserSchema):Promise<UserDocument>{
        return {
            mobile:user.mobile,
            encryptedOtp:await this.hashString(this.generateOtp()),
            otpExpiry:new Date(Date.now() + Number(this.configService.get<number>("OTP_EXPIRES_IN_SEC")) * 1000),
            lastOtpSentAt:new Date(),
            otpSentCount:1,
            
        } as unknown as UserDocument
    }
}