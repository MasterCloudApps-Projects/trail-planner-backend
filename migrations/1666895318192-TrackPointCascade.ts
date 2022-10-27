import { MigrationInterface, QueryRunner } from "typeorm";

export class TrackPointCascade1666895318192 implements MigrationInterface {
    name = 'TrackPointCascade1666895318192'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track_point_entity" DROP CONSTRAINT "FK_8af49a7f508b6682083f45338af"`);
        await queryRunner.query(`ALTER TABLE "track_point_entity" ADD CONSTRAINT "FK_8af49a7f508b6682083f45338af" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "track_point_entity" DROP CONSTRAINT "FK_8af49a7f508b6682083f45338af"`);
        await queryRunner.query(`ALTER TABLE "track_point_entity" ADD CONSTRAINT "FK_8af49a7f508b6682083f45338af" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
