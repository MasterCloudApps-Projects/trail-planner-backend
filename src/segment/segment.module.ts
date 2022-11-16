import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';

@Module({
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
