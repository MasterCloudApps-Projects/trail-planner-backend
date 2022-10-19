import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class FeatureFlag {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  isEnabled: boolean;
}

export default FeatureFlag;
