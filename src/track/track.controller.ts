import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackService } from './track.service';
import { UploadGPXDto } from './dto/uploadGPX.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('/upload-gpx')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGPX(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadGpxDto: UploadGPXDto,
  ) {
    await this.trackService.parseGPX(file.buffer.toString());
  }
}
