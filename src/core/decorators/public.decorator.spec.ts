import { Reflector } from '@nestjs/core';
import { Public, IS_PUBLIC_KEY } from './public.decorator';

describe('Public Decorator', () => {
  class TestController {
    @Public()
    publicRoute() {}

    protectedRoute() {}
  }

  const reflector = new Reflector();

  it('should set metadata IS_PUBLIC_KEY to true when @Public() is used', () => {
    const controller = new TestController();
    const isPublic = reflector.get<boolean>(IS_PUBLIC_KEY, controller.publicRoute);
    expect(isPublic).toBe(true);
  });

  it('should return undefined for routes without @Public()', () => {
    const controller = new TestController();
    const isPublic = reflector.get<boolean>(IS_PUBLIC_KEY, controller.protectedRoute);
    expect(isPublic).toBeUndefined();
  });
});
