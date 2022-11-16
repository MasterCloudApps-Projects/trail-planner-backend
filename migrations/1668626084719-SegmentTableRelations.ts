import { MigrationInterface, QueryRunner } from "typeorm";

export class SegmentTableRelations1668626084719 implements MigrationInterface {
    name = 'SegmentTableRelations1668626084719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a"`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "segment" DROP CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a"`);
        await queryRunner.query(`ALTER TABLE "segment" ADD CONSTRAINT "FK_860dc5b4f05d30ec6ab6437d97a" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
