import { MigrationInterface, QueryRunner } from "typeorm";

export class TicketRenameUserToEmail1690661248778 implements MigrationInterface {
    name = 'TicketRenameUserToEmail1690661248778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`user\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`email\` \`user\` varchar(255) NOT NULL`);
    }

}
