import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { FileModule } from './files/files.module';
import { DB } from './app.db';
import { DbModule } from './db.module';

@Module({
  imports: [UserModule, FileModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
