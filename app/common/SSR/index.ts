import { Response, Request, NextFunction } from 'express';
import { renderFullPage } from './renderFullPage';
import { isDevelopment } from '@/app/util/util';

export async function SSR(req: Request, res: Response) {
  if (isDevelopment()) {
    const { renderFullPage: renderFullPageDev } = await import(
      '@/app/common/SSR/renderFullPage'
    );
    return renderFullPageDev(req, res);
  } else {
    return renderFullPage(req, res);
  }
}
