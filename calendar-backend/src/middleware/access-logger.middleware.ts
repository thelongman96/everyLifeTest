import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Access Log');

  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();

    res.on('finish', () => {
      const httpMethod = req.method;
      const requestUri = req.url;
      const responseTimeMs = Date.now() - now;
      const status = res.statusCode;
      const payload = req.body;
      const msg = `${httpMethod} ${requestUri} ${JSON.stringify(payload)} - ${status} (${responseTimeMs}ms)`;

      if (status >= 500) {
        this.logger.error(msg);
      } else {
        this.logger.log(msg);
      }
    });

    next();
  }
}
