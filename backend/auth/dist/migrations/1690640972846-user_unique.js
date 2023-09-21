"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUnique1690640972846 = void 0;
class UserUnique1690640972846 {
    constructor() {
        this.name = 'UserUnique1690640972846';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
    }
}
exports.UserUnique1690640972846 = UserUnique1690640972846;
//# sourceMappingURL=1690640972846-user_unique.js.map