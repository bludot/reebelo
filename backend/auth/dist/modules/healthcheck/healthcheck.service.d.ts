import { HealthCheckService } from '@nestjs/terminus';
import { AppHealthIndicator } from './app.health';
export declare class HealthService {
    private appHealthIndicator;
    private health;
    constructor(appHealthIndicator: AppHealthIndicator, health: HealthCheckService);
    healthCheck(): Promise<any>;
}
