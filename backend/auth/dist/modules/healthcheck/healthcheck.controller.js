"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const healthcheck_service_1 = require("./healthcheck.service");
let HealthCheckController = exports.HealthCheckController = class HealthCheckController {
    constructor(healthCheckService) {
        this.healthCheckService = healthCheckService;
    }
    check() {
        return this.healthCheckService.healthCheck();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthCheckController.prototype, "check", null);
exports.HealthCheckController = HealthCheckController = __decorate([
    (0, common_1.Controller)('healthcheck'),
    __metadata("design:paramtypes", [healthcheck_service_1.HealthService])
], HealthCheckController);
//# sourceMappingURL=healthcheck.controller.js.map