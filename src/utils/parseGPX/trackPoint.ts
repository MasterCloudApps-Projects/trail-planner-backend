export class TrackPoint {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly elevation: number,
    public readonly time: Date,
  ) {}
}
