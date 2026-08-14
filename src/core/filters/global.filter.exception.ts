import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx= host.switchToHttp()
        const request= ctx.getRequest<FastifyRequest>();
        const response = ctx.getResponse<FastifyReply>();

        const requestId=request.headers['x-request-id']??crypto.randomUUID();

        let statusCode= HttpStatus.INTERNAL_SERVER_ERROR
        let code=0
        let message='Internal Server Error'
        let details:unknown=undefined

        if(exception instanceof HttpException){
            statusCode= exception.getStatus();
            const exceptionResponse=exception.getResponse();

            if(typeof exceptionResponse==='string'){
                message=exceptionResponse
            }else{
                const error= exceptionResponse as Record<string,any>

                message=error.message as string ?? message;
                code=error.code as number ?? code;
                details=error.details ?? details;
            }
        }

        return response.status(statusCode).send({
      success: false,

      error: {
        code,
        message,
        ...(details !== undefined && { details }),
      },

      meta: {
        requestId,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
    }
}