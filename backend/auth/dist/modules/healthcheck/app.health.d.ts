import { ConfigService } from '../config/config.service';
import { HealthcheckConfig } from './healthcheck.config';
import { HealthcheckResponse } from './healthcheck.dto';
export declare class AppHealthIndicator {
    private readonly config;
    constructor(config: ConfigService<HealthcheckConfig>);
    getStatus(): Promise<HealthcheckResponse>;
}
