import { Module } from '@nestjs/common';
import { DomainModule } from './domains/domain.module';
import { EnvConfig } from './configs/env.config';
import { DbConfig } from './configs/db.config';

@Module({
  imports: [DomainModule,EnvConfig,DbConfig],
})
export class AppModule {}
