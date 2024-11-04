import { MigrationInterface, QueryRunner } from "typeorm";
export declare class MigrationName1730748850340 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
