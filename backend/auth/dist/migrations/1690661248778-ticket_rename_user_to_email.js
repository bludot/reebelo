"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRenameUserToEmail1690661248778 = void 0;
class TicketRenameUserToEmail1690661248778 {
    constructor() {
        this.name = 'TicketRenameUserToEmail1690661248778';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`user\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`email\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket\` CHANGE \`email\` \`user\` varchar(255) NOT NULL`);
    }
}
exports.TicketRenameUserToEmail1690661248778 = TicketRenameUserToEmail1690661248778;
//# sourceMappingURL=1690661248778-ticket_rename_user_to_email.js.map