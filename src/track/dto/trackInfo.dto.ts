import { TrackPointDto } from './trackPoint.dto';

export class TrackInfoDto {
  public readonly name: string;
  public readonly description: string;
  public readonly type: string;
  public readonly points: TrackPointDto[];

  constructor() {
    this.points = [];
  }

  addPoint(point: TrackPointDto) {
    this.points.push(point);
  }
}
