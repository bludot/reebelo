import { MigrationInterface, QueryRunner } from "typeorm";

export class MessagesTable1690813241243 implements MigrationInterface {
    name = 'MessagesTable1690813241243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`sender\` varchar(255) NOT NULL, \`parent\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}
