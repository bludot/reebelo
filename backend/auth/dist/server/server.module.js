"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ServerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerModule = void 0;
const common_1 = require("@nestjs/common");
const healthcheck_module_1 = require("../modules/healthcheck/healthcheck.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const upper_case_directive_1 = require("../modules/common/directives/upper-case.directive");
const path = require("path");
const hello_api_module_1 = require("../modules/hello-api/hello-api.module");
let ServerModule = exports.ServerModule = ServerModule_1 = class ServerModule {
    static forRoot(config) {
        return {
            module: ServerModule_1,
            imports: [
                ...(config ? [healthcheck_module_1.HealthcheckModule] : [healthcheck_module_1.HealthcheckModule]),
                hello_api_module_1.HelloAPIModule
            ],
        };
    }
};
exports.ServerModule = ServerModule = ServerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            healthcheck_module_1.HealthcheckModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: true,
                typePaths: process.env.ENV == 'local'
                    ? ['./src/**/*.graphql']
                    : [process.cwd() + '/**/*.graphql'],
                transformSchema: (schema) => (0, upper_case_directive_1.upperDirectiveTransformer)(schema, 'upper'),
                definitions: {
                    path: path.join(process.cwd(), 'src/graphql.ts'),
                    outputAs: 'class',
                },
            }),
        ],
    })
], ServerModule);
//# sourceMappingURL=server.module.js.map