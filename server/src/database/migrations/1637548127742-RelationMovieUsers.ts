import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationMovieUsers1637548127742 implements MigrationInterface {
  name = "RelationMovieUsers1637548127742";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."movies" ADD "usersId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."movies" ADD "releaseDate" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."movies" ADD CONSTRAINT "FK_b0edeb0b2087cd7857fa11c4790" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."movies" DROP CONSTRAINT "FK_b0edeb0b2087cd7857fa11c4790"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."movies" DROP COLUMN "releaseDate"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."movies" ADD "releaseDate" date NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."movies" DROP COLUMN "usersId"`
    );
  }
}
