import { Injectable } from '@nestjs/common';
import { GPXParser } from '../utils/GPXParser/GPXParser';
import TrackEntity from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import TrackPointEntity from '../trackPoint/trackPoint.entity';
import { Repository } from 'typeorm';
import { TrackPoint } from '../utils/GPXParser/trackPoint';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async parseGPX(gpx: string) {
    const parser = new GPXParser();
    const gpxData = parser.parse(gpx);

    const trackEntity = new TrackEntity();
    trackEntity.name = gpxData.name;
    trackEntity.trackPoints = [];
    trackEntity.description = gpxData.name;
    trackEntity.type = 'default';

    gpxData.tracks[0].trackSegments[0].trackPoints.map(
      (trackPoint: TrackPoint) => {
        const trackPointEntity = new TrackPointEntity();
        trackPointEntity.elevation = trackPoint.elevation;
        trackPointEntity.coordinates = {
          type: 'Point',
          coordinates: [trackPoint.longitude, trackPoint.latitude],
        };
        trackEntity.trackPoints.push(trackPointEntity);
      },
    );

    await this.trackRepository.save(trackEntity, { chunk: 1000 });
  }

  async getTrackInfo(trackId: number): Promise<TrackEntity> {
    return await this.trackRepository.findOne({
      where: {
        id: trackId,
      },
    });
  }
}
