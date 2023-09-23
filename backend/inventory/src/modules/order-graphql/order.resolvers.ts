import {Inject, UseGuards} from '@nestjs/common';
import {Args, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Logger} from 'winston';
import {CreateInventoryInput, Inventory, Order, UpdateInventoryInput} from '../../graphql';
import {AuthGraphqlGuard} from '../auth/auth.graphql.guard';
import {InventoryService} from "../inventory/inventory.service";

@Resolver('Order')
export class OrderResolvers {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly inventoryService: InventoryService,
    ) {
    }
    ResolveReference
    @ResolveField('items')
    async orders(@Parent() order: Order, @Args('itemids') itemids: string[], @Args('quantity') quantity: number[]): Promise<Inventory[]> {
        this.logger.info(`Getting inventory by item ids ${JSON.stringify(order)} | ${JSON.stringify(itemids)} | ${JSON.stringify(quantity)}`);
        const inventory = await this.inventoryService.getInventoryByIDs(itemids);
        return {
            id: '1',
            itemIds: itemids,
            items: inventory.map((inventory, index) => ({
                id: inventory.id,
                name: inventory.name,
                description: inventory.description,
                price: inventory.price,
                quantity: inventory.quantity[index],
                category: inventory.category,
                image: inventory.image,
                createdAt: inventory.createdAt,
                updatedAt: inventory.updatedAt,
            })),
            quantity: order.quantity,

        }
    }


}
