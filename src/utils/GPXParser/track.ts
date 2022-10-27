import { TrackPoint } from './trackPoint';
import { TrackSegment } from './trackSegment';

export class Track {
  public readonly name: string;
  public readonly trackSegments: TrackSegment[];

  constructor(name: string) {
    this.name = name;
    this.trackSegments = [];
  }

  addTrackSegment(trackSegment: TrackSegment) {
    this.trackSegments.push(trackSegment);
  }
}
