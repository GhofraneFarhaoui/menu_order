"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable = void 0;
class CreateUserTable {
}
exports.CreateUserTable = CreateUserTable;
ts1729070186480;
implements;
typeorm_1.MigrationInterface;
{
    name = 'CreateUserTable.ts1729070186480';
    async;
    up(queryRunner, typeorm_1.QueryRunner);
    Promise < void  > {
        await: queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    };
    async;
    down(queryRunner, typeorm_1.QueryRunner);
    Promise < void  > {
        await: queryRunner.query(`DROP TABLE "user"`)
    };
}
