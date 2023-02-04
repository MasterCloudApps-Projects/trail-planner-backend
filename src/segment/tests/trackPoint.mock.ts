import TrackPointEntity from '../../trackPoint/trackPoint.entity';
import mockedTrack from './track.mock';

const mockedTrackPoint: TrackPointEntity = {
  id: 1,
  track: mockedTrack,
  latitude: 0.12,
  longitude: 12.123,
  elevation: 123,
  created_at: new Date(),
  updated_at: new Date(),
};

export default mockedTrackPoint;
