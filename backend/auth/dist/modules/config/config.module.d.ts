import { DynamicModule } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';
import { IConfigServiceOptions } from './types';
export declare class ConfigModule {
    static register<T>(type: ClassConstructor<T>, options?: IConfigServiceOptions): DynamicModule;
}
