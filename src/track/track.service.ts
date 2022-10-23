import { Injectable } from '@nestjs/common';
import { ParseGPX } from '../utils/parseGPX/parseGPX';
import TrackEntity from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import TrackPointEntity from '../trackPoint/trackPoint.entity';
import { Repository } from 'typeorm';
import { Point } from 'geojson';
import { TrackPoint } from '../utils/parseGPX/trackPoint';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  parseGPX(gpx: string) {
    const parsedGPX = new ParseGPX(gpx);

    const trackEntity = new TrackEntity();
    trackEntity.name = parsedGPX.trackName;
    trackEntity.trackPoints = [];
    trackEntity.description = parsedGPX.trackName;
    trackEntity.type = 'default';

    parsedGPX.trackPoints.map((trackPoint: TrackPoint) => {
      const trackPointEntity = new TrackPointEntity();
      trackPointEntity.elevation = trackPoint.elevation;
      trackPointEntity.coordinates = {
        type: 'Point',
        coordinates: [trackPoint.longitude, trackPoint.latitude],
      };
      trackEntity.trackPoints.push(trackPointEntity);
    });

    this.trackRepository.save(trackEntity);
  }
}
