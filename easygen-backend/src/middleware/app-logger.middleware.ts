import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;

    this.logger.log(`Received Request ${method} ${url}`);
    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(`Returned Response ${statusCode}`);
    });

    next();
  }
}
