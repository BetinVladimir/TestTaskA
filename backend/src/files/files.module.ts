import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';
import { DbModule } from '../db.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Module({
  imports: [DbModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
