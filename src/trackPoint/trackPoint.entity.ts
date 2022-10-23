import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TrackEntity from '../track/track.entity';
import { Point } from 'geojson';

@Entity()
class TrackPointEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({
    type: 'geometry',
    srid: 4326,
    nullable: false,
    spatialFeatureType: 'Point',
  })
  coordinates: Point;

  @Column({ type: 'int' })
  elevation: number;

  @ManyToOne(() => TrackEntity, (trackEntity) => trackEntity.trackPoints)
  track: TrackEntity;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}

export default TrackPointEntity;
