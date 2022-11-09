import { Test, TestingModule } from '@nestjs/testing';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import fs from 'fs';
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

  it('should be defined', () => {
    expect(trackController).toBeDefined();
  });
});
