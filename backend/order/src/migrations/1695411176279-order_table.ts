import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderTable1695411176279 implements MigrationInterface {
    name = 'OrderTable1695411176279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(255) NOT NULL, \`parent_id\` varchar(255) NULL, \`user_id\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`tracking_number\` varchar(255) NULL, \`item_id\` varchar(255) NULL, \`quantity\` bigint NULL, \`status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_1031171c13130102495201e3e2\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_1031171c13130102495201e3e2\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
