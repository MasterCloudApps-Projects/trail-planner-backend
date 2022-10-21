import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePointColumn1666330758503 implements MigrationInterface {
  name = 'CreatePointColumn1666330758503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track_point_entity" DROP COLUMN "utm_x"`);
    await queryRunner.query(`ALTER TABLE "track_point_entity" DROP COLUMN "utm_y"`);
    await queryRunner.query(`ALTER TABLE "track_point_entity"
        ADD "coordinates" geometry(Point,4326) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "track_point_entity" DROP COLUMN "coordinates"`);
    await queryRunner.query(`ALTER TABLE "track_point_entity"
        ADD "utm_y" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "track_point_entity"
        ADD "utm_x" double precision NOT NULL`);
  }
}
