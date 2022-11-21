import { Test, TestingModule } from '@nestjs/testing';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackPointService } from '../trackPoint/trackPoint.service';

describe('TrackController', () => {
  let trackController: TrackController;
  const mockTrackService = {};
  const mockTrackPointService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [TrackService, TrackPointService],
    })
      .overrideProvider(TrackService)
      .useValue(mockTrackService)
      .overrideProvider(TrackPointService)
      .useValue(mockTrackPointService)
      .compile();

    trackController = module.get<TrackController>(TrackController);
  });

  it('Controller should be defined', () => {
    expect(trackController).toBeDefined();
  });

  it('uploadGPX should be defined', () => {
    expect(trackController.uploadGPX).toBeDefined();
  });

  it('getTrackInfo should be defined', () => {
    expect(trackController.getTrackInfo).toBeDefined();
  });

  it('deleteTrack should be defined', () => {
    expect(trackController.deleteTrack).toBeDefined();
  });

  it('updateTrackInfo should be defined', () => {
    expect(trackController.updateTrackInfo).toBeDefined();
  });

  it('getTrackPoints should be defined', () => {
    expect(trackController.getTrackPoints).toBeDefined();
  });
});
