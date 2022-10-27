import { TrackPoint } from './trackPoint';

export class TrackSegment {
  public readonly trackPoints: TrackPoint[];

  constructor() {
    this.trackPoints = [];
  }

  addTrackPoint(trackPoint: TrackPoint) {
    this.trackPoints.push(trackPoint);
  }
}
