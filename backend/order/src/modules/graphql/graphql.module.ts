import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloFederationDriver, ApolloFederationDriverConfig} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: true,
      // autoSchemaFile: path.join(process.cwd(), 'src/schema.graphql'),
    }),
  ],
})
export class GraphqlModule {}
