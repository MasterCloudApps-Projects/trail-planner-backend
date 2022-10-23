import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('/upload-gpx')
  @UseInterceptors(FileInterceptor('file'))
  uploadGPX(@UploadedFile() file: Express.Multer.File) {
    this.trackService.parseGPX(file.buffer.toString());
  }
}
