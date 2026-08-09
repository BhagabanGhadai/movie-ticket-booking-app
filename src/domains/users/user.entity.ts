import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ECurrentStatus, IUserDocument } from "./user.interface";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User implements IUserDocument {
    @Prop({type:String,required:true})
    name: string;

    @Prop({type:String,required:true,unique:true})
    email: string;

    @Prop({type:String,required:true,unique:true})
    mobile: string;

    @Prop({type:String})
    avatar: string;

    @Prop({type:String,enum:ECurrentStatus,default:ECurrentStatus.inactive})
    currentStatus:ECurrentStatus;

    @Prop({type:String,minLength:6,maxLength:6,default:null})
    encryptedOtp:string;

    @Prop({type:Date,default:null})
    otpExpiry:Date;
    
    @Prop({type:Date,default:null})
    lastOtpSentAt:Date;
    
    @Prop({type:Date,default:null})
    lastLoginAt:Date;
    
    @Prop({type:Number,default:0})
    loginAttempts:number;
    
    @Prop({type:Number,default:0})
    loginCount:number;

    @Prop({type:Number,default:0})
    version:number;

    @Prop({type:Number,default:0})
    otpSentCount:number;
    
    @Prop({type:Boolean,default:false})
    isBlocked:boolean;
    
    @Prop({type:Date,default:null})
    blockedAt:Date;
    
    @Prop({type:String,default:null})
    blockedReason:string;
    
    @Prop({type:Date,default:null})
    blockedUntil:Date;
    
    @Prop({type:Date,default:null})
    deletedAt:Date;
}

export const UserSchema = SchemaFactory.createForClass(User);