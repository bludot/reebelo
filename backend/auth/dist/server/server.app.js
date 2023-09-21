"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const config_service_1 = require("./../modules/config/config.service");
const server_config_1 = require("./server.config");
const server_module_1 = require("./server.module");
const server_swagger_1 = require("./server.swagger");
async function start() {
    const serverConfig = new config_service_1.ConfigService(server_config_1.ServerConfig);
    const app = await core_1.NestFactory.create(server_module_1.ServerModule.forRoot(serverConfig), {
        ...(!serverConfig.env.NESTJS_LOGS_ENABLED ? { logger: false } : {}),
    });
    app.use(cookieParser());
    app.enableCors({ origin: true, credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, server_swagger_1.setup)(app, serverConfig.env);
    await app.listen(serverConfig.env.PORT, serverConfig.env.HOSTNAME);
    return app;
}
exports.start = start;
//# sourceMappingURL=server.app.js.map