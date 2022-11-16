import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { FeatureFlagsModule } from './featureFlags/featureFlags.module';
import { TrackModule } from './track/track.module';
import { AppController } from './app/app.controller';
import { SegmentModule } from './segment/segment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FeatureFlagsModule,
    TrackModule,
    SegmentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
