import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { ResponseInterceptor } from './response.intercept';

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(() => {
    interceptor = new ResponseInterceptor();
  });

  it('should transform successful response into standard envelope format', (done) => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
          url: '/user',
        }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    const mockNext: CallHandler = {
      handle: () => of([]),
    };

    interceptor.intercept(mockContext, mockNext).subscribe((result) => {
      expect(result).toMatchObject({
        success: true,
        message: 'Operation successful',
        data: [],
        error: null,
      });
      expect(result.meta).toBeDefined();
      expect(result.meta.code).toBe(1);
      expect(result.meta.path).toBe('/user');
      expect(typeof result.meta.requestId).toBe('string');
      expect(typeof result.meta.timestamp).toBe('string');
      done();
    });
  });
});
