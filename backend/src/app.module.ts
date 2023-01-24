import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { FileModule } from './files/files.module';
import { DbModule } from './db.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UserModule, FileModule, DbModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
