import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { SemaphoreMiddleware } from './middleware/semaphore.middleware';
import { SemaphoreService } from './semaphore.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, SemaphoreService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(RateLimiterMiddleware)
      // .forRoutes('*')
      .apply(SemaphoreMiddleware)
      .forRoutes('*');
  }
}
