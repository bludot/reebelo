import { Module } from '@nestjs/common'
import { HelloController } from './hello-api.controller'
import {HelloApiResolvers} from "./hello-api.graphql";

@Module({
  controllers: [HelloController],
  providers: [HelloApiResolvers],
})
export class HelloAPIModule {}
