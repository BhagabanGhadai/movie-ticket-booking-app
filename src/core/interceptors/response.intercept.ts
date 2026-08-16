import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RESPONSE_MESSAGE_KEY } from '../decorators/responseMessage.decorator';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private readonly reflector?: Reflector) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const requestId = (request.headers['x-request-id'] as string) ?? crypto.randomUUID();

        const customMessage = this.reflector
            ? this.reflector.getAllAndOverride<string>(RESPONSE_MESSAGE_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            : undefined;

        return next.handle().pipe(
            map((data) => {
                let message = customMessage ?? 'Operation successful';
                let responseData = data;

                if (
                    data &&
                    typeof data === 'object' &&
                    !Array.isArray(data) &&
                    'message' in data &&
                    'data' in data
                ) {
                    message = customMessage ?? (data.message as string);
                    responseData = data.data;
                }

                return {
                    success: true,
                    message,
                    data: responseData ?? [],
                    error: null,
                    meta: {
                        code: 1,
                        requestId,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                    },
                };
            }),
        );
    }
}