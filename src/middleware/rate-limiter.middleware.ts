import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter: RateLimiterMemory = new RateLimiterMemory({
  points: 1, // 1 request per 10 seconds
  duration: 10,
});

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const rateLimiterRes = await rateLimiter.consume(req.ip);

      res.setHeader('X-RateLimit-Limit', rateLimiterRes.remainingPoints);
      res.setHeader('X-RateLimit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader(
        'X-RateLimit-Reset',
        Math.ceil(rateLimiterRes.msBeforeNext / 1000),
      );

      next();
    } catch (e) {
      res.status(429).send('TooManyRequestsError');
    }
  }
}
