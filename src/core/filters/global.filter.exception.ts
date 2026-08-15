import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    const requestId = (request.headers['x-request-id'] as string) ?? crypto.randomUUID();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 0;
    let message = 'Internal Server Error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const error = exceptionResponse as Record<string, any>;

        // Handle ValidationPipe array messages gracefully
        if (Array.isArray(error.message)) {
          message = 'Validation failed';
          details = error.message;
        } else {
          message = (error.message as string) ?? message;
        }

        code = (error.code as number) ?? code;
        details = error.details ?? details;
      }
    } else if (typeof exception === 'object' && exception !== null && 'statusCode' in exception) {
      // Handle native Fastify errors (e.g., 400 Bad Request JSON parse error)
      statusCode = (exception as any).statusCode;
      message = (exception as any).message ?? message;
    } else {
      // Log unhandled server errors (500) with full stack trace for debugging
      this.logger.error(
        `Unhandled exception on ${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    return response.status(statusCode).send({
      success: false,
      message,
      error: {
        ...(details !== undefined && { details }),
      },
      meta: {
        code,
        requestId,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
