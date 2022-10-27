import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrackService } from './track.service';
import { TrackInfoDto } from './dto/trackInfo.dto';
import TrackEntity from './track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post('/upload-gpx')
  @UseInterceptors(FileInterceptor('file'))
  async uploadGPX(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadGpxDto: TrackInfoDto,
  ) {
    await this.trackService.parseGPX(file.buffer.toString());
  }

  @Get(':trackId')
  async getTrackInfo(@Param() params): Promise<TrackEntity> {
    return this.trackService.getTrackInfo(params.trackId);
  }

  @Delete(':trackId')
  async deleteTrack(@Param() params) {
    return await this.trackService.deleteTrack(params.trackId);
  }

  @Put(':trackId')
  async updateTrackInfo(@Param() params, @Body() trackInfo: TrackInfoDto) {
    return await this.trackService.updateTrack(params.trackId, trackInfo);
  }
}
