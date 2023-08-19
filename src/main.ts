import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['asdfasfd']
  }))
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true, // remove extra properties that are not defined in the DTO class (dto-validation)
      }
    ));
  
  await app.listen(3000);
}
bootstrap();
