import { Track } from './track';

export class GpxData {
  public readonly name: string;
  public readonly time: Date;
  public readonly tracks: Track[];

  constructor(name: string, time: Date) {
    this.name = name;
    this.time = time;
    this.tracks = [];
  }

  addTrack(track: Track) {
    this.tracks.push(track);
  }
}
