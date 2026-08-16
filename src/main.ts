import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { GlobalExceptionFilter } from './core/filters/global.filter.exception';
import { AuthGuard } from './core/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter());
  app.useGlobalGuards(new AuthGuard());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
