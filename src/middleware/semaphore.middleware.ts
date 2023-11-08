import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SemaphoreService } from '../semaphore.service';

@Injectable()
export class SemaphoreMiddleware implements NestMiddleware {
  constructor(private readonly semaphoreService: SemaphoreService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const acquired = await this.semaphoreService.acquire();
    if (acquired) {
      next();
    } else {
      res.status(503).send('ServiceCurrentlyUnavailableError');
    }
  }
}
