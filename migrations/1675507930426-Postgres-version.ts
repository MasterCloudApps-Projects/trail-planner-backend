import { MigrationInterface, QueryRunner } from 'typeorm';

export class removePointType1675507930426 implements MigrationInterface {
  name = 'removePointType1675507930426';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "track_point_entity"
                             (
                                 "id"         integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "latitude"   double precision                     NOT NULL,
                                 "longitude"  double precision                     NOT NULL,
                                 "elevation"  integer                              NOT NULL,
                                 "created_at" TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "updated_at" TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "trackId"    integer,
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
    await queryRunner.query(`CREATE TABLE "segment"
                             (
                                 "id"             integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                                 "title"          character varying                    NOT NULL,
                                 "description"    character varying                    NOT NULL,
                                 "created_at"     TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "updated_at"     TIMESTAMP                            NOT NULL DEFAULT ('now'::text):: timestamp (6) with time zone,
                                 "trackId"        integer,
                                 "initialPointId" integer,
                                 "finalPointId"   integer,
                                 CONSTRAINT "PK_d648ac58d8e0532689dfb8ad7ef" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "track_point_entity"
        ADD CONSTRAINT "FK_8af49a7f508b6682083f45338af" FOREIGN KEY ("trackId") REFERENCES "track_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "segment"
        ADD CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a" FOREIGN KEY ("trackId") REFERENCES "track_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "segment"
        ADD CONSTRAINT "FK_eb78493e9deabdafcb392114c67" FOREIGN KEY ("initialPointId") REFERENCES "track_point_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "segment"
        ADD CONSTRAINT "FK_b734d0c8f6741085fc986090ed1" FOREIGN KEY ("finalPointId") REFERENCES "track_point_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_b734d0c8f6741085fc986090ed1"`);
    await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_eb78493e9deabdafcb392114c67"`);
    await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a"`);
    await queryRunner.query(`ALTER TABLE "track_point_entity" DROP CONSTRAINT "FK_8af49a7f508b6682083f45338af"`);
    await queryRunner.query(`DROP TABLE "segment"`);
    await queryRunner.query(`DROP TABLE "feature_flag"`);
    await queryRunner.query(`DROP TABLE "track_entity"`);
    await queryRunner.query(`DROP TABLE "track_point_entity"`);
  }
}
