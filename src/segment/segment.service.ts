import { Injectable } from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import TrackEntity from '../track/track.entity';
import { Repository } from 'typeorm';
import TrackPointEntity from '../trackPoint/trackPoint.entity';
import { TrackNotFoundException } from '../track/exception/TrackNotFoundException';
import { TrackPointNotFoundException } from '../trackPoint/exception/TrackPointNotFoundException';
import { Segment } from './entities/segment.entity';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(TrackPointEntity)
    private trackPointRepository: Repository<TrackPointEntity>,
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
  ) {}

  async create(createSegmentDto: CreateSegmentDto): Promise<Segment> {
    const track = await this.getTrackOrThrow(createSegmentDto.trackId);
    const initialPoint = await this.getTrackPointOrThrow(
      createSegmentDto.initialPointId,
    );
    const finalPoint = await this.getTrackPointOrThrow(
      createSegmentDto.finalPointId,
    );

    const segment = new Segment();
    segment.track = track;
    segment.initialPoint = initialPoint;
    segment.finalPoint = finalPoint;
    segment.title = createSegmentDto.title;
    segment.description = createSegmentDto.description;
    await this.segmentRepository.save(segment);

    return segment;
  }

  findAll() {
    return `This action returns all segment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} segment`;
  }

  update(id: number, updateSegmentDto: UpdateSegmentDto) {
    return `This action updates a #${id} segment`;
  }

  remove(id: number) {
    return `This action removes a #${id} segment`;
  }

  private getTrackOrThrow(id: number) {
    const result = this.trackRepository.findOne({
      where: {
        id,
      },
    });

    if (result === null) {
      throw new TrackNotFoundException();
    }

    return result;
  }

  private getTrackPointOrThrow(id: number) {
    const result = this.trackPointRepository.findOne({
      where: {
        id,
      },
    });

    if (result === null) {
      throw new TrackPointNotFoundException();
    }

    return result;
  }
}
