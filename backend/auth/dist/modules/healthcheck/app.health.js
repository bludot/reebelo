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
exports.AppHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const pidUsage = require("pidusage");
const config_service_1 = require("../config/config.service");
let AppHealthIndicator = exports.AppHealthIndicator = class AppHealthIndicator {
    constructor(config) {
        this.config = config;
    }
    async getStatus() {
        const usageStats = await pidUsage(process.pid);
        const usage = {
            cpu: Math.round((usageStats.cpu + Number.EPSILON) * 100) / 100,
            memory: Math.round((usageStats.memory / 1024 / 1024 + Number.EPSILON) * 100) /
                100,
        };
        const appState = { ready: 1 };
        return {
            appState: {
                version: this.config.env.SERVICE_VERSION,
                ...(this.config.env.LOG_LEVEL === 'debug' ? { usage } : {}),
                ...(this.config.env.LOG_LEVEL === 'debug' ? { app: appState } : {}),
            },
        };
    }
};
exports.AppHealthIndicator = AppHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], AppHealthIndicator);
//# sourceMappingURL=app.health.js.map