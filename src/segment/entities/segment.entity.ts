import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import TrackEntity from '../../track/track.entity';
import TrackPointEntity from '../../trackPoint/trackPoint.entity';

@Entity()
export class Segment {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => TrackEntity, (trackEntity) => trackEntity.segments, {
    onDelete: 'CASCADE',
  })
  track: TrackEntity;

  @OneToOne(() => TrackPointEntity)
  initialPoint: TrackPointEntity;

  @OneToOne(() => TrackPointEntity)
  finalPoint: TrackPointEntity;

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
