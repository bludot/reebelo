import {Inject, UseGuards} from '@nestjs/common';
import {Args, Context, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
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
    async orders(@Parent() order: Order): Promise<Inventory[]> {
        this.logger.info(`Getting inventory by item ids `);
        const itemIds = order.itemIds.filter((item) => item !== null);
        const quantity = order.quantity.filter((item) => item !== null);
        const inventory = await this.inventoryService.getInventoryByIDs(itemIds);
        this.logger.info(`got inventory by item ids ${inventory}`);
        return inventory.map((inventory, index) => ({
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: quantity[index],
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }))


    }


}
