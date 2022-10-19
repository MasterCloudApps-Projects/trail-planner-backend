import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeatureFlagsTable1666199721483 implements MigrationInterface {
  name = 'CreateFeatureFlagsTable1666199721483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "feature_flag"
                             (
                                 "id"        integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "name"      character varying                    NOT NULL,
                                 "isEnabled" boolean                              NOT NULL,
                                 CONSTRAINT "UQ_0cb1810eca363db1e0bf13c3cf3" UNIQUE ("name"),
                                 CONSTRAINT "PK_f390205410d884907604a90c0f4" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "feature_flag"`);
  }
}
