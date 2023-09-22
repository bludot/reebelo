import {Inject, Injectable} from '@nestjs/common';
import {Logger} from 'winston';
import {InjectRepository} from '@nestjs/typeorm';
import {InventoryEntity} from './repository/inventory.entity';
import {InventoryRepository} from './repository/inventory.repository';

@Injectable()
export class InventoryService {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        @InjectRepository(InventoryEntity)
        private readonly ticketRepository: InventoryRepository,
    ) {
    }

    async createInventory(
        name: string,
        description: string,
        price: number,
        quantity: number,
        image: string,
        category: string,
        misc: string,
    ): Promise<InventoryEntity> {
        this.logger.info('Creating inventory');
        const inventory: InventoryEntity = await this.ticketRepository.createInventory(
            name,
            description,
            price,
            quantity,
            image,
            category,
            misc,
        );

        return inventory
    }

    async updateInventory(
        id: string,
        name: string,
        description: string,
        price: number,
        quantity: number,
        image: string,
        category: string,
        misc: string,
    ): Promise<InventoryEntity> {
        this.logger.info('Updating inventory');
        const inventory: InventoryEntity = await this.ticketRepository.updateInventory(
            id,
            name,
            description,
            price,
            quantity,
            image,
            category,
            misc,
        );

        return inventory
    }

    async updateQuantity(
        id: string,
        quantity: number,
    ): Promise<InventoryEntity> {
        this.logger.info('Updating inventory quantity');
        const inventory: InventoryEntity = await this.ticketRepository.updateQuantity(
            id,
            quantity,
        );

        return inventory
    }

    async deleteInventory(id: string): Promise<void> {
        this.logger.info('Deleting inventory');
        await this.ticketRepository.deleteInventory(id);

    }

    async getInventoryByID(id: string): Promise<InventoryEntity> {
        this.logger.info('Getting inventory by id');
        const inventory: InventoryEntity = await this.ticketRepository.findByID(id);
        if (!inventory) {
            throw new Error('Inventory not found');
        }

        return inventory;

    }


    async getInventoryByName(name: string): Promise<InventoryEntity> {
        this.logger.info('Getting inventory by name');
        const inventory: InventoryEntity = await this.ticketRepository.findByName(
            name,
        );
        if (!inventory) {
            throw new Error('Inventory not found');
        }

        return inventory;
    }

    async getInventoryByCategory(category: string): Promise<InventoryEntity[]> {
        this.logger.info('Getting inventory by category');
        const inventory: InventoryEntity[] = await this.ticketRepository.findByCategory(
            category,
        );

        return inventory;
    }

    async getInventoryByIDs(ids: string[]): Promise<InventoryEntity[]> {
        this.logger.info('Getting inventory by ids');
        const inventory: InventoryEntity[] = await this.ticketRepository.getInventoryByIDs(
            ids,
        );

        return inventory;
    }


}
