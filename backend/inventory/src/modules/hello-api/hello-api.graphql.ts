import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloApiResolvers {
  constructor() {}

  @Query('hello')
  async hello(): Promise<string> {
    return 'hello world';
  }
}
