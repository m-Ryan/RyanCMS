import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { renderFullPage } from '../SSR/renderFullPage';
import { isDevelopment } from '@/app/util/util';
import chalk from 'chalk';

const whiteList = [
  '/sockjs-node'
];

@Injectable()
export class RenderMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (whiteList.some(path => req.path.includes(path))) {
        return next();
      };

      let renderPage = '';

      if (isDevelopment()) {
        const { renderFullPage: renderFullPageDev } = await import('../SSR/renderFullPage');
        renderPage = await renderFullPageDev(req, res, next);
      } else {
        renderPage = await renderFullPage(req, res, next);
      }

      if (renderPage) {
        res.contentType('text/html; charset=utf-8');
        return res.end(renderPage);
      }
    } catch (error) {
      console.log(chalk.red('error：'), error);
      return res.redirect(`/error?message=${error.message}&code=${error.code || 500}&expect=${req.path}`);
    }


    return next();
  }
}
