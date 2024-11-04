import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1730748850340 implements MigrationInterface {
    name = 'MigrationName1730748850340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "image_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "image_url" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "image_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "menu_items" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "image_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
