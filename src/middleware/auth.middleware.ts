import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// YWRtaW46YWRtaW4=

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      console.log(process.env.AUTH_USER);
      const [username, password] = Buffer.from(
        authHeader.split(' ')[1],
        'base64',
      )
        .toString()
        .split(':');

      if (
        username === process.env.AUTH_USER &&
        password === process.env.AUTH_PASS
      ) {
        return next();
      }
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).send('Unauthorized');
  }
}
