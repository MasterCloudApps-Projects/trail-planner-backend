import { XMLParser } from 'fast-xml-parser';
import { TrackPoint } from './trackPoint';

export class ParseGPX {
  private gpxParsed;

  public readonly trackName: string;
  public readonly trackPoints: TrackPoint[];

  constructor(gpx: string) {
    const options = {
      attributeNamePrefix: '',
      ignoreAttributes: false,
      parseAttributeValue: true,
    };

    this.trackPoints = [];

    const parser = new XMLParser(options);
    const gpxParsed = parser.parse(gpx);

    this.trackName = gpxParsed.gpx.trk.name;

    if (gpxParsed.gpx.trk.trkseg !== undefined) {
      gpxParsed.gpx.trk.trkseg.trkpt.map((trkpt) => {
        const trackPoint = new TrackPoint(
          trkpt.lat,
          trkpt.lon,
          Math.round(trkpt.ele),
          new Date(trkpt.time),
        );
        this.trackPoints.push(trackPoint);
      });
    }
  }
}
