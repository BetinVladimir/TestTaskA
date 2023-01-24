import { Controller, Get, Post, Request, Param, UploadedFile, UseInterceptors, UseGuards, Response, HttpException, HttpStatus, Query } from '@nestjs/common';
import { FileService } from './files.service';
import { IFile, IFileList } from './types';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { query } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('/file')
export class FileController {
  constructor(private readonly fileService: FileService,  private jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async addFile(@Request() req, @UploadedFile() file: Express.Multer.File): Promise<{ fileId: string }> {
    // const userId: string = req.cookies.userId
    const data = {
      fileName: file.originalname,
      data: file.buffer,
      size: file.buffer.length
    }
    const fileId = await this.fileService.addFile(req.user?.userId, data)
    return { fileId }
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async listFiles(@Request() req): Promise<IFileList> {
    const userId: string = req.user?.userId
    return this.fileService.listFiles(userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  async getFileAuth(@Request() req, @Response() res): Promise<void> {
    const userId: string = req.user?.userId
    
    res.cookie('userid',userId, { maxAge: 900000, secure: true, httpOnly: true, sameSite: 'none' })

    res.redirect('/');
  }

  @Get('/auth2')
  async getFileAuth2(@Query('token') token: string, @Response() res): Promise<void> {
    const data= await this.jwtService.verifyAsync(token)
    const userId: string = data.sub
    
    res.cookie('userid',userId, { maxAge: 900000, secure: true, httpOnly: true, sameSite: 'none' })

    res.redirect('https://localhost:3001/');
  }

  @Get('/:fileId')
  async getFile(@Request() req, @Param() params, @Response() response): Promise<void> {
    const userId: string = req.cookies?.userid
    if (!userId) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    response.end(await this.fileService.getFile(userId, params.fileId))
  }

}
