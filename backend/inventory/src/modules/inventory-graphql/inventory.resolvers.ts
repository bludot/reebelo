import {Inject, UseGuards} from '@nestjs/common';
import {Args, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference} from '@nestjs/graphql';
import {Logger} from 'winston';
import {CreateInventoryInput, Inventory, Order, UpdateInventoryInput} from '../../graphql';
import {AuthGraphqlGuard} from '../auth/auth.graphql.guard';
import {InventoryService} from "../inventory/inventory.service";

@Resolver()
export class InventoryResolvers {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly inventoryService: InventoryService,
    ) {
    }

    @ResolveReference()
    async orders(reference: { __typename: string; itemIds: string[], quantity: number[] }): Promise<Order> {
        this.logger.info('Reference', reference.__typename);
        this.logger.info('Getting inventory by item ids');
        const inventory = await this.inventoryService.getInventoryByIDs(reference.itemIds);
        return {
            id: '1',
            itemIds: reference.itemIds,
            items: inventory.map((inventory, index) => ({
                id: inventory.id,
                name: inventory.name,
                description: inventory.description,
                price: inventory.price,
                quantity: reference.quantity[index],
                category: inventory.category,
                image: inventory.image,
                createdAt: inventory.createdAt,
                updatedAt: inventory.updatedAt,
            })),
            quantity: reference.quantity,

        }
    }


    @Mutation('createInventory')
    @UseGuards(AuthGraphqlGuard)
    async createInventory(@Args('input') args: CreateInventoryInput): Promise<Inventory> {
        this.logger.info('Creating inventory');
        const inventory = await this.inventoryService.createInventory(
            args.name,
            args.description,
            args.price,
            args.quantity,
            args.category,
            args.image,
            args.misc
        );

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        };
    }

    @Query('inventory')
    async getInventoryByID(@Args('id') id: string): Promise<Inventory> {
        this.logger.info('Getting inventory by id');
        const inventory = await this.inventoryService.getInventoryByID(id);

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }
    }

    @Query('inventoryByName')
    async getInventoryByName(@Args('name') name: string): Promise<Inventory> {
        this.logger.info('Getting inventory by name');
        const inventory = await this.inventoryService.getInventoryByName(name);

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }
    }

    @Query('inventoryByCategory')
    async getInventoryByCategory(@Args('category') category: string): Promise<Inventory[]> {
        this.logger.info('Getting inventory by category');
        const inventory = await this.inventoryService.getInventoryByCategory(category);

        return inventory.map((inventory) => ({
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }));
    }

    @Mutation('updateInventory')
    async updateInventory(@Args('input') args: UpdateInventoryInput): Promise<Inventory> {
        this.logger.info('Updating inventory');
        const inventory = await this.inventoryService.updateInventory(
            args.id,
            args.name,
            args.description,
            args.price,
            args.quantity,
            args.category,
            args.image,
            args.misc,
        );

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }
    }

    @Mutation('deleteInventory')
    async deleteInventory(@Args('id') id: string): Promise<Inventory> {
        this.logger.info('Deleting inventory');
        const inventory = await this.inventoryService.getInventoryByID(id);
        const deleted = await this.inventoryService.deleteInventory(id);

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }
    }

    @Mutation('updateInventoryQuantity')
    async updateInventoryQuantity(@Args('input') input: UpdateInventoryInput): Promise<Inventory> {
        this.logger.info('Updating inventory quantity');
        const inventory = await this.inventoryService.updateQuantity(
            input.id,
            input.quantity,
        )

        return {
            id: inventory.id,
            name: inventory.name,
            description: inventory.description,
            price: inventory.price,
            quantity: inventory.quantity,
            category: inventory.category,
            image: inventory.image,
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }
    }


}
