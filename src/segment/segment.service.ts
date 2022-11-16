import { Injectable } from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Injectable()
export class SegmentService {
  create(createSegmentDto: CreateSegmentDto) {
    return 'This action adds a new segment';
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
}
