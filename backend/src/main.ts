import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as fs from 'node:fs'
import * as cookieParser from 'cookie-parser';

const httpsOptions = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.enableCors({ origin: '*', credentials: true });
  app.use(cookieParser());
  await app.listen(3002);
}
bootstrap();
