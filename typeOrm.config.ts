import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import TrackEntity from './src/track/track.entity';
import TrackPointEntity from './src/trackPoint/trackPoint.entity';
import FeatureFlagEntity from './src/featureFlags/featureFlag.entity';
import { Segment } from './src/segment/entities/segment.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [TrackEntity, TrackPointEntity, FeatureFlagEntity, Segment],
  migrations: ['./migrations/*.ts'],
});
