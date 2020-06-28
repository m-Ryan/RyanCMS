import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';



@Injectable()
export class StaticProxyMiddleware implements NestMiddleware {
  private staticProxy = createProxyMiddleware(['/*.*', '/**/*.*'], {
    target: 'http://localhost:3000',
    changeOrigin: true,
  });
  async use(req: Request, res: Response, next: NextFunction) {
    this.staticProxy(req, res, next);
  }
}
