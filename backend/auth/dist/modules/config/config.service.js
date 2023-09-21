"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const fs = require("fs");
const path = require("path");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dotenv = require("dotenv");
class ConfigService {
    constructor(type, options = {}) {
        this.type = type;
        dotenv.config({ path: this.resolveEnvFile(options.envFile) });
        this.env = this.inputToClass(process.env);
        this.validateInput(this.env);
    }
    inputToClass(configObject) {
        return (0, class_transformer_1.plainToClass)(this.type, configObject, {
            excludeExtraneousValues: true,
        });
    }
    validateInput(envConfig) {
        const errors = (0, class_validator_1.validateSync)(envConfig, {
            validationError: { target: false },
        });
        if (errors.length) {
            throw new MultipleValidationError(errors, this.type.name);
        }
        return envConfig;
    }
    resolveEnvFile(envFile) {
        const optionsEnvFile = path.join(process.cwd(), envFile ?? 'env.local.env');
        if (fs.existsSync(optionsEnvFile)) {
            return optionsEnvFile;
        }
        if (fs.existsSync(path.join(process.cwd(), envFile ?? 'env.test.env'))) {
            return path.join(process.cwd(), envFile ?? 'env.test.env');
        }
        return path.join(process.cwd(), '.env');
    }
}
exports.ConfigService = ConfigService;
class MultipleValidationError extends Error {
    constructor(errors, typeName) {
        super([
            `Found ${errors.length} validation error${errors.length === 1 ? '' : 's'} while validating ${typeName}:`,
            ...errors.map((e) => ` - ${`${e}`.trimEnd().replace(/\n/g, '\n   ')}`),
        ].join('\n\n'));
        this.errors = errors;
    }
}
//# sourceMappingURL=config.service.js.map