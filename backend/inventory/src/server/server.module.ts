import {DynamicModule, Module} from '@nestjs/common';
import {ConfigService} from '../modules/config/config.service';
import {HealthcheckModule} from '../modules/healthcheck/healthcheck.module';
import {ServerConfig} from './server.config';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloFederationDriver, ApolloFederationDriverConfig} from '@nestjs/apollo';
import {upperDirectiveTransformer} from '../modules/common/directives/upper-case.directive';
import * as path from 'path';
import {TypeormConnector2Module} from "../modules/mysql-connector2/mysql-connector2.module";
import {HelloAPIModule} from "../modules/hello-api/hello-api.module";
import {InventoryGraphqlModule} from "../modules/inventory-graphql/inventory-graphql.module";

@Module({
    imports: [
        HealthcheckModule,
        TypeormConnector2Module,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            playground: true,
            typePaths:
                process.env.ENV == 'local'
                    ? ['./src/**/*.graphql']
                    : [process.cwd() + '/**/*.graphql'],
            transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
            //autoSchemaFile: path.join(process.cwd(), 'src/schema.graphql'),
            definitions: {
                path: path.join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        }),
    ],
})
export class ServerModule {
    static forRoot(config: ConfigService<ServerConfig>): DynamicModule {
        return {
            module: ServerModule,
            imports: [
                ...(config ? [HealthcheckModule] : [HealthcheckModule]),
                HelloAPIModule,
                InventoryGraphqlModule,
            ],
        };
    }
}
