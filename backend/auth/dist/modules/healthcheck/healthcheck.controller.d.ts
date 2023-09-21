import { HealthService } from './healthcheck.service';
export declare class HealthCheckController {
    private healthCheckService;
    constructor(healthCheckService: HealthService);
    check(): Promise<any>;
}
