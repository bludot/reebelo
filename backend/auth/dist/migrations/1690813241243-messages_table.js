"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesTable1690813241243 = void 0;
class MessagesTable1690813241243 {
    constructor() {
        this.name = 'MessagesTable1690813241243';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`sender\` varchar(255) NOT NULL, \`parent\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`message\``);
    }
}
exports.MessagesTable1690813241243 = MessagesTable1690813241243;
//# sourceMappingURL=1690813241243-messages_table.js.map