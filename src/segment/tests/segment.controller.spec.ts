import { Test, TestingModule } from '@nestjs/testing';
import { SegmentController } from '../segment.controller';
import { SegmentService } from '../segment.service';

describe('SegmentController', () => {
  let controller: SegmentController;

  beforeEach(async () => {
    const createSegment = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SegmentController],
      providers: [
        {
          provide: SegmentService,
          useValue: {
            create: createSegment,
          },
        },
      ],
    }).compile();

    controller = module.get<SegmentController>(SegmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a segment', () => {
    // TODO Implement test
  });

  it('should not create segment when track not exists', () => {
    // TODO Implement test
  });

  it('should not create segment when initial track point not exists', () => {
    // TODO Implement test
  });

  it('should not create segment when final track point not exists', () => {
    // TODO Implement test
  });
});
