import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationUserMovies1637866686403 implements MigrationInterface {
    name = 'RelationUserMovies1637866686403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "releaseDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD CONSTRAINT "FK_64a78407424745d6c053e93cc36" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP CONSTRAINT "FK_64a78407424745d6c053e93cc36"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "releaseDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "userId"`);
    }

}
