import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationUserMovies1637781706894 implements MigrationInterface {
    name = 'RelationUserMovies1637781706894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "usernameId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "releaseDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD CONSTRAINT "FK_0684fe8b48839003940eb4a9079" FOREIGN KEY ("usernameId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP CONSTRAINT "FK_0684fe8b48839003940eb4a9079"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`);
        await queryRunner.query(`ALTER TABLE "public"."movies" ADD "releaseDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."movies" DROP COLUMN "usernameId"`);
    }

}
