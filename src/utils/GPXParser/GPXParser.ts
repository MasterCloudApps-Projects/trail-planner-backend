import { XMLParser } from 'fast-xml-parser';
import { TrackPoint } from './trackPoint';
import { GpxData } from './gpxData';
import { TrackSegment } from './trackSegment';
import { Track } from './track';

export class GPXParser {
  parse(gpx: string): GpxData {
    const xmlParsed = this.parseXML(gpx);

    const gpxData = new GpxData(
      xmlParsed.gpx.metadata.name,
      new Date(xmlParsed.gpx.metadata.time),
    );

    if (xmlParsed.gpx.trk.trkseg !== undefined) {
      const trackSegment = new TrackSegment();

      xmlParsed.gpx.trk.trkseg.trkpt.map((trkpt) => {
        const trackPoint = new TrackPoint(
          trkpt.lat,
          trkpt.lon,
          Math.round(trkpt.ele),
          new Date(trkpt.time),
        );

        trackSegment.addTrackPoint(trackPoint);
      });

      const track: Track = new Track(xmlParsed.gpx.trk.name);
      track.addTrackSegment(trackSegment);
      gpxData.addTrack(track);
    }

    return gpxData;
  }

  private parseXML(gpx: string) {
    const options = {
      attributeNamePrefix: '',
      ignoreAttributes: false,
      parseAttributeValue: true,
    };

    const parser = new XMLParser(options);
    return parser.parse(gpx);
  }
}
