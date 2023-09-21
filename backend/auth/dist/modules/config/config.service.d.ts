import { ClassConstructor } from 'class-transformer';
import { IConfigServiceOptions } from './types';
export declare class ConfigService<T> {
    private readonly type;
    readonly env: T;
    constructor(type: ClassConstructor<T>, options?: IConfigServiceOptions);
    private inputToClass;
    private validateInput;
    resolveEnvFile(envFile: string): string;
}
