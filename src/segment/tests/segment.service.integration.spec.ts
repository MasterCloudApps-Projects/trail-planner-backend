import { SegmentService } from '../segment.service';
import { Segment } from '../entities/segment.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import TrackEntity from '../../track/track.entity';
import TrackPointEntity from '../../trackPoint/trackPoint.entity';
import { TrackNotFoundException } from '../../track/exception/TrackNotFoundException';
import mockedTrack from './track.mock';
import mockedTrackPoint from './trackPoint.mock';
import { TrackPointNotFoundException } from '../../trackPoint/exception/TrackPointNotFoundException';

describe('Segment service integration tests', () => {
  let segmentService: SegmentService;
  let findOneTrack;
  let findOneTrackPoint;

  const segmentRepository = {
    save: jest.fn().mockImplementation((segmentEntity: Segment) =>
      Promise.resolve({
        id: new Date(),
        ...segmentEntity,
      }),
    ),
  };

  beforeEach(async () => {
    findOneTrack = jest.fn();
    findOneTrackPoint = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SegmentService,
        {
          provide: getRepositoryToken(TrackEntity),
          useValue: {
            findOne: findOneTrack,
          },
        },
        {
          provide: getRepositoryToken(TrackPointEntity),
          useValue: {
            findOne: findOneTrackPoint,
          },
        },
        {
          provide: getRepositoryToken(Segment),
          useValue: segmentRepository,
        },
      ],
    }).compile();

    segmentService = module.get<SegmentService>(SegmentService);
  });

  it('should be defined', () => {
    expect(segmentService).toBeDefined();
  });

  it('should fail when track id not exists', async () => {
    findOneTrack.mockReturnValue(Promise.resolve(null));

    try {
      await segmentService.create({
        trackId: 1,
        title: 'Test segment',
        description: 'Segment to test',
        initialPointId: 1,
        finalPointId: 2,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TrackNotFoundException);
    }
  });
  it('should fail when initial point id not exists', async () => {
    findOneTrack.mockReturnValue(Promise.resolve(mockedTrack));
    findOneTrackPoint
      .mockReturnValueOnce(Promise.resolve(null))
      .mockReturnValueOnce(Promise.resolve(mockedTrackPoint));

    try {
      await segmentService.create({
        trackId: 1,
        title: 'Test segment',
        description: 'Segment to test',
        initialPointId: 1,
        finalPointId: 2,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TrackPointNotFoundException);
    }
  });
  it('should fail when final point id not exists', async () => {
    findOneTrack.mockReturnValue(Promise.resolve(mockedTrack));
    findOneTrackPoint
      .mockReturnValueOnce(Promise.resolve(mockedTrackPoint))
      .mockReturnValueOnce(Promise.resolve(null));

    try {
      await segmentService.create({
        trackId: 1,
        title: 'Test segment',
        description: 'Segment to test',
        initialPointId: 1,
        finalPointId: 2,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(TrackPointNotFoundException);
    }
  });
  it('should save segment', async () => {
    findOneTrack.mockReturnValue(Promise.resolve(mockedTrack));
    findOneTrackPoint
      .mockReturnValueOnce(Promise.resolve(mockedTrackPoint))
      .mockReturnValueOnce(Promise.resolve(mockedTrackPoint));

    const segment = await segmentService.create({
      trackId: 1,
      title: 'Test segment',
      description: 'Segment to test',
      initialPointId: 1,
      finalPointId: 2,
    });

    expect(segment).not.toBeNull();
  });
});
