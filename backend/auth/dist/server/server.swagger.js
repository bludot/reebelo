"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const swagger_1 = require("@nestjs/swagger");
function setup(app, config) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Auth API')
        .setVersion(config.SERVICE_VERSION)
        .addBearerAuth()
        .addServer(`http://localhost:${config.PORT}/`)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
}
exports.setup = setup;
//# sourceMappingURL=server.swagger.js.map