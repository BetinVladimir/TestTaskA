import { Module } from '@nestjs/common';
import { DB } from './app.db';

@Module({
  providers: [DB],
  exports: [DB],
})
export class DbModule {}
