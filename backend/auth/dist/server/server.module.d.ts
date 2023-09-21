import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '../modules/config/config.service';
import { ServerConfig } from './server.config';
export declare class ServerModule {
    static forRoot(config: ConfigService<ServerConfig>): DynamicModule;
}
