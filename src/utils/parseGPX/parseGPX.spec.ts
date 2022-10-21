import { ParseGPX } from './parseGPX';

describe('Parse GPX Library Tests', () => {
  describe('Parse GPX file', () => {
    it('Should get track name', () => {
      const gpxFileContents =
        '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
        '<gpx version="1.1">\n' +
        ' <trk>\n' +
        '  <name>Portaceli</name>' +
        ' </trk>' +
        '</gpx>';

      const parseGPX = new ParseGPX(gpxFileContents);

      expect(parseGPX.trackName).toBe('Portaceli');
    });

    it('Should get track points', () => {
      const gpxFileContents =
        '<?xml version="1.0" encoding="UTF-8" standalone="no" ?>\n' +
        '<gpx version="1.1">\n' +
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

      const parseGPX = new ParseGPX(gpxFileContents);
      expect(parseGPX.trackName).toBe('Portaceli');
      expect(parseGPX.trackPoints.length).toBe(3);
      expect(parseGPX.trackPoints[0].latitude).toBe(39.686398);
      expect(parseGPX.trackPoints[0].longitude).toBe(-0.470822);
      expect(parseGPX.trackPoints[0].elevation).toBe(286);
      expect(parseGPX.trackPoints[0].time).toStrictEqual(
        new Date('2017-04-22T09:38:20.000Z'),
      );

      expect(parseGPX.trackPoints[1].latitude).toBe(39.686572);
      expect(parseGPX.trackPoints[1].longitude).toBe(-0.470868);
      expect(parseGPX.trackPoints[1].elevation).toBe(304);
      expect(parseGPX.trackPoints[1].time).toStrictEqual(
        new Date('2017-04-22T09:38:28.000Z'),
      );

      expect(parseGPX.trackPoints[2].latitude).toBe(39.686675);
      expect(parseGPX.trackPoints[2].longitude).toBe(-0.470927);
      expect(parseGPX.trackPoints[2].elevation).toBe(311);
      expect(parseGPX.trackPoints[2].time).toStrictEqual(
        new Date('2017-04-22T09:38:30.000Z'),
      );
    });
  });
});
