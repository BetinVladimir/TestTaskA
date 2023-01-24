import { Module } from '@nestjs/common';
import { FileController } from './files.controller';
import { FileService } from './files.service';
import { DbModule } from '../db.module';

@Module({
  imports: [DbModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
