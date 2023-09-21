"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_app_1 = require("./server/server.app");
if (require.main === module) {
    (0, server_app_1.start)().catch(die);
}
function die(error) {
    console.error(error);
    process.exit(1);
}
//# sourceMappingURL=main.js.map