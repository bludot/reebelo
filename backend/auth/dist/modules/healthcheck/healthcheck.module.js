"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckModule = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const config_module_1 = require("../config/config.module");
const app_health_1 = require("./app.health");
const healthcheck_config_1 = require("./healthcheck.config");
const healthcheck_controller_1 = require("./healthcheck.controller");
const healthcheck_service_1 = require("./healthcheck.service");
let HealthcheckModule = exports.HealthcheckModule = class HealthcheckModule {
};
exports.HealthcheckModule = HealthcheckModule = __decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule, config_module_1.ConfigModule.register(healthcheck_config_1.HealthcheckConfig)],
        providers: [app_health_1.AppHealthIndicator, healthcheck_service_1.HealthService],
        controllers: [healthcheck_controller_1.HealthCheckController],
    })
], HealthcheckModule);
//# sourceMappingURL=healthcheck.module.js.map