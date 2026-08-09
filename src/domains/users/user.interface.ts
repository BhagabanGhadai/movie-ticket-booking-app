export interface IUserDocument{
    name:string;
    email:string;
    mobile:string;
    avatar?:string;
    currentStatus:ECurrentStatus;
    encryptedOtp?:string;
    otpExpiry?:Date;
    lastOtpSentAt?:Date;
    lastLoginAt?:Date;
    loginAttempts?:number;
    loginCount?:number;
    version?:number;
    otpSentCount?:number;
    isBlocked?:boolean;
    blockedAt?:Date;
    blockedReason?:string;
    blockedUntil?:Date;
    deletedAt?:Date;
}

export interface IUserController{
    
}

export enum ECurrentStatus {
    active = 'active',
    inactive = 'inactive',
    delete = 'delete'
}