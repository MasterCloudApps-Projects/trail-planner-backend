import { MigrationInterface, QueryRunner } from "typeorm";

export class SegmentTable1668625911634 implements MigrationInterface {
    name = 'SegmentTable1668625911634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "segment" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "trackId" integer, "initialPointId" integer, "finalPointId" integer, CONSTRAINT "PK_d648ac58d8e0532689dfb8ad7ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_eb78493e9deabdafcb392114c67" FOREIGN KEY ("initialPointId") REFERENCES "track_point_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_b734d0c8f6741085fc986090ed1" FOREIGN KEY ("finalPointId") REFERENCES "track_point_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_b734d0c8f6741085fc986090ed1"`);
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_eb78493e9deabdafcb392114c67"`);
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a"`);
        await queryRunner.query(`DROP TABLE "segment"`);
    }

}
