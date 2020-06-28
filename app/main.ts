import './common/SSR/browerMock';
import { NestFactory } from '@nestjs/core';
import ServerStatic from 'serve-static';
import { AppModule } from './app.module';
import { ExceptionFilter } from './common/filters/exception.filter';
import bodyParser from 'body-parser';
import { isDevelopment } from './util/util';
import { staticDir, SERVER_PORT } from './common/constant/path';
import { awaitStaticReady } from './common/SSR/awaitStaticReady';
import { watchClientReload } from '@/app/common/SSR/watchClientReload';

async function bootstrap() {
  if (isDevelopment()) {
    watchClientReload();
  } else {
    await awaitStaticReady();
  }

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilter());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    ServerStatic(staticDir, {
      index: false,
    })
  );
  const port = process.env.SSR_SERVER_PORT || SERVER_PORT;
  await app.listen(SERVER_PORT, () => {
    console.log(`服务器已开启: http://localhost:${port}`);
  });
}

bootstrap();
