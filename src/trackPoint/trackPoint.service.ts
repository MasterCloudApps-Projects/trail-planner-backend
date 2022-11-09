import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TrackPointEntity from './trackPoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackPointService {
  constructor(
    @InjectRepository(TrackPointEntity)
    private trackPointRepository: Repository<TrackPointEntity>
  ) {}

  async getTrackPoints(trackId: number) {
    return await this.trackPointRepository.find({
      where: {
        track: {
          id: trackId,
        },
      },
    });
  }
}
