import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserUnique1690640972846 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
