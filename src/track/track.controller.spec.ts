import { Test, TestingModule } from '@nestjs/testing';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import fs from 'fs';

describe('TrackController', () => {
  let trackController: TrackController;
  const mockTrackService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackController],
      providers: [TrackService],
    })
      .overrideProvider(TrackService)
      .useValue(mockTrackService)
      .compile();

    trackController = module.get<TrackController>(TrackController);
  });

  it('should be defined', () => {
    expect(trackController).toBeDefined();
  });
});
