import { Test, TestingModule } from '@nestjs/testing';
import { TrackService } from '../track.service';
import TrackEntity from '../track.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import gpxFileContents from './gpx_file_contents';

describe('TrackService', () => {
  let trackService: TrackService;

  const trackEntityRepository = {
    save: jest.fn().mockImplementation((trackEntity) =>
      Promise.resolve({
        id: Date.now(),
        ...trackEntity,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrackService,
        {
          provide: getRepositoryToken(TrackEntity),
          useValue: trackEntityRepository,
        },
      ],
    }).compile();

    trackService = module.get<TrackService>(TrackService);
  });

  it('should be defined', () => {
    expect(trackService).toBeDefined();
  });

  it('should parse GPX and save track', () => {
    trackService.parseGPX(gpxFileContents);
  });
});
