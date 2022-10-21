import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { XMLParser } from 'fast-xml-parser';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadGPX(@UploadedFile() file: Express.Multer.File) {
    return 'GPX';
  }
}
