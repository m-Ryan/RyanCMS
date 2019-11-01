import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './common/filters/exception.filter';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  await app.listen(8080, () => {
    console.log('服务器已开启');
  });
}

bootstrap();
