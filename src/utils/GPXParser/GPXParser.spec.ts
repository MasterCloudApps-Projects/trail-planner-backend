import { GPXParser } from './GPXParser';

describe('Parse GPX Library Tests', () => {
  describe('Parse GPX file', () => {
    it('Should get track name', () => {
      const gpxFileContents =
        '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
        '<gpx version="1.1">\n' +
        '  <metadata>\n' +
        '        <name>Portaceli</name>\n' +
        '        <time>2016-12-15T18:11:44.000Z</time>\n' +
        '  </metadata>' +
        '  <trk>\n' +
        '    <name>Portaceli</name>' +
        '  </trk>' +
        '</gpx>';

      const parser = new GPXParser();
      const gpxParsed = parser.parse(gpxFileContents);

      expect(gpxParsed.name).toBe('Portaceli');
      expect(gpxParsed.time).toStrictEqual(
        new Date('2016-12-15T18:11:44.000Z'),
      );
    });

    it('Should get track points', () => {
      const gpxFileContents =
        '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
        '<gpx version="1.1">\n' +
        ' <metadata>\n' +
        '        <name>Portaceli</name>\n' +
        '        <time>2016-12-15T18:11:44.000Z</time>\n' +
        ' </metadata>' +
        ' <trk>\n' +
        '  <name>Portaceli</name>' +
        '  <trkseg>\n' +
        '   <trkpt lon="-0.47082200" lat="39.68639800">\n' +
        '    <ele>286</ele>\n' +
        '    <time>2017-04-22T09:38:20.000Z</time>\n' +
        '    <extensions>\n' +
        '     <ql:flags>16</ql:flags>\n' +
        '     <ql:activity>0</ql:activity>\n' +
        '    </extensions>\n' +
        '   </trkpt>\n' +
        '   <trkpt lon="-0.47086800" lat="39.68657200">\n' +
        '    <ele>304</ele>\n' +
        '    <time>2017-04-22T09:38:28.000Z</time>\n' +
        '    <extensions>\n' +
        '     <ql:flags>0</ql:flags>\n' +
        '     <ql:activity>0</ql:activity>\n' +
        '    </extensions>\n' +
        '   </trkpt>\n' +
        '   <trkpt lon="-0.47092700" lat="39.68667500">\n' +
        '    <ele>311</ele>\n' +
        '    <time>2017-04-22T09:38:30.000Z</time>\n' +
        '    <extensions>\n' +
        '     <ql:flags>0</ql:flags>\n' +
        '     <ql:activity>0</ql:activity>\n' +
        '    </extensions>\n' +
        '   </trkpt>' +
        '  </trkseg>\n' +
        ' </trk>' +
        '</gpx>';

      const parser = new GPXParser();
      const gpxParsed = parser.parse(gpxFileContents);

      expect(gpxParsed.name).toBe('Portaceli');
      expect(gpxParsed.tracks.length).toBe(1);
      expect(gpxParsed.tracks[0].trackSegments.length).toBe(1);
      expect(gpxParsed.tracks[0].trackSegments[0].trackPoints.length).toBe(3);
      expect(gpxParsed.tracks[0].trackSegments[0].trackPoints[0].latitude).toBe(
        39.686398,
      );
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[0].longitude,
      ).toBe(-0.470822);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[0].elevation,
      ).toBe(286);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[0].time,
      ).toStrictEqual(new Date('2017-04-22T09:38:20.000Z'));

      expect(gpxParsed.tracks[0].trackSegments[0].trackPoints[1].latitude).toBe(
        39.686572,
      );
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[1].longitude,
      ).toBe(-0.470868);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[1].elevation,
      ).toBe(304);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[1].time,
      ).toStrictEqual(new Date('2017-04-22T09:38:28.000Z'));

      expect(gpxParsed.tracks[0].trackSegments[0].trackPoints[2].latitude).toBe(
        39.686675,
      );
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[2].longitude,
      ).toBe(-0.470927);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[2].elevation,
      ).toBe(311);
      expect(
        gpxParsed.tracks[0].trackSegments[0].trackPoints[2].time,
      ).toStrictEqual(new Date('2017-04-22T09:38:30.000Z'));
    });
  });
});
