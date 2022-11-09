import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstVersion1666894097636 implements MigrationInterface {
  name = 'FirstVersion1666894097636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgis');

    await queryRunner.query(`CREATE TABLE "track_point_entity"
                             (
                                 "id"          integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "coordinates" geometry(Point,4326) NOT NULL,
                                 "elevation"   integer                              NOT NULL,
                                 "created_at"  TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "updated_at"  TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "trackId"     integer,
                                 CONSTRAINT "PK_8d22e5296a7bed26d7a935fcbc4" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "track_entity"
                             (
                                 "id"          integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "name"        character varying                    NOT NULL,
                                 "description" character varying                    NOT NULL,
                                 "type"        character varying                    NOT NULL,
                                 "created_at"  TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "updated_at"  TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "feature_flag"
                             (
                                 "id"        integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "name"      character varying                    NOT NULL,
                                 "isEnabled" boolean                              NOT NULL,
                                 CONSTRAINT "UQ_0cb1810eca363db1e0bf13c3cf3" UNIQUE ("name"),
                                 CONSTRAINT "PK_f390205410d884907604a90c0f4" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "track_point_entity"
        ADD CONSTRAINT "FK_8af49a7f508b6682083f45338af" FOREIGN KEY ("trackId") REFERENCES "track_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track_point_entity" DROP CONSTRAINT "FK_8af49a7f508b6682083f45338af"`,
    );
    await queryRunner.query(`DROP TABLE "feature_flag"`);
    await queryRunner.query(`DROP TABLE "track_entity"`);
    await queryRunner.query(`DROP TABLE "track_point_entity"`);
  }
}
