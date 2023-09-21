"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepo1690659284704 = void 0;
class TicketRepo1690659284704 {
    constructor() {
        this.name = 'TicketRepo1690659284704';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`priority\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d9a0835407701eb86f874474b7\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX \`IDX_d9a0835407701eb86f874474b7\` ON \`ticket\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
    }
}
exports.TicketRepo1690659284704 = TicketRepo1690659284704;
//# sourceMappingURL=1690659284704-ticket_repo.js.map