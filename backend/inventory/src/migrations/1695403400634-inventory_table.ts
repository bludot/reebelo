import { MigrationInterface, QueryRunner } from "typeorm";

export class InventoryTable1695403400634 implements MigrationInterface {
    name = 'InventoryTable1695403400634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` bigint NOT NULL, \`quantity\` bigint NOT NULL, \`image\` varchar(255) NULL, \`category\` varchar(255) NULL, \`misc\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d9a0835407701eb86f874474b7\` (\`id\`), UNIQUE INDEX \`IDX_162a7e3d06bea9fdf98405860f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_162a7e3d06bea9fdf98405860f\` ON \`ticket\``);
        await queryRunner.query(`DROP INDEX \`IDX_d9a0835407701eb86f874474b7\` ON \`ticket\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
    }

}
