import { HttpException, HttpStatus } from "@nestjs/common";

export class AppException extends HttpException{
    constructor(
        message:string,
        statusCode:HttpStatus,
        public readonly code:number=0,
        public readonly details?:unknown
    ){
        super({
            code,
            message,
            statusCode,
            details
        },statusCode)
    }
}