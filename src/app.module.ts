import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { SemaphoreMiddleware } from './middleware/semaphore.middleware';
import { SemaphoreService } from './semaphore.service';
import { HealthService } from './health.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SemaphoreService, HealthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimiterMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.ALL })
      .apply(SemaphoreMiddleware)
      .forRoutes({ path: 'upload', method: RequestMethod.ALL });
  }
}
