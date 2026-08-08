export interface IUserDocument{
    name:string;
    email:string;
    phone:string;
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
    isDeleted?:boolean;
    deletedAt?:Date;
    deletedReason?:string;
    deletedUntil?:Date;
}

export enum ECurrentStatus {
    active = 'active',
    inactive = 'inactive',
    delete = 'delete'
}