import TrackEntity from '../../track/track.entity';

const mockedTrack: TrackEntity = {
  id: 1,
  name: 'Mocked Track',
  description: 'Mocked Track Description',
  type: 'mountain',
  created_at: new Date(),
  updated_at: new Date(),
  trackPoints: [],
};

export default mockedTrack;
