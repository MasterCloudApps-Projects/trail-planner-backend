import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import TrackEntity from './track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrackPointEntity from '../trackPoint/trackPoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, TrackPointEntity])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
