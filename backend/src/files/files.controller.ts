import { Controller, Get, Post, Request, Param } from '@nestjs/common';
import { FileService } from './files.service';
import { IFile, IFileList } from './types';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  async addFile(@Request() req, body: IFile): Promise<{ fileId: string }> {
    const userId: string = req.cookies.userId
    const fileId = await this.fileService.addFile(userId, body)
    return { fileId }
  }

  @Get('/')
  async listFiles(@Request() req): Promise<IFileList> {
    const userId: string = req.cookies.userId
    return this.fileService.listFiles(userId)
  }

  @Get('/:fileId')
  async getFile(@Request() req, @Param() params): Promise<Buffer> {
    const userId: string = req.cookies.userId
    return this.fileService.getFile(userId, params.fileId)
  }
}
