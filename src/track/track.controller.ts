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
import TrackPointEntity from '../trackPoint/trackPoint.entity';
import { TrackPointService } from '../trackPoint/trackPoint.service';

@Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly trackPointService: TrackPointService,
  ) {}

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

  @Get('/:trackId/track-points')
  async getTrackPoints(@Param() params): Promise<TrackPointEntity[]> {
    return await this.trackPointService.getTrackPoints(params.trackId);
  }

  @Get('/')
  async getTrackList(): Promise<TrackEntity[]> {
    return await this.trackService.getTrackList();
  }
}
