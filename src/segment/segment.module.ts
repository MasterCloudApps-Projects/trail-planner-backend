import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackEntity from '../track/track.entity';
import TrackPointEntity from '../trackPoint/trackPoint.entity';
import { Segment } from './entities/segment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, TrackPointEntity, Segment])],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
