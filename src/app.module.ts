import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SemaphoreService } from './semaphore.service';
import { HealthService } from './health.service';
import {
  AuthMiddleware,
  RateLimiterMiddleware,
  SemaphoreMiddleware,
} from './middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, SemaphoreService, HealthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*')
      .apply(RateLimiterMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.ALL })
      .apply(SemaphoreMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.ALL });
  }
}
