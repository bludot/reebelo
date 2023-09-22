import { InventoryEntity} from './inventory.entity';
import {Repository} from 'typeorm';
import {ulid} from 'ulid';

export interface InventoryRepository extends Repository<InventoryEntity> {
    this: Repository<InventoryEntity>;

    createInventory(
        name: string,
        description: string,
        price: number,
        quantity: number,
        image: string,
        category: string,
        misc: string,
    ): Promise<InventoryEntity>;

    findByID(id: string): Promise<InventoryEntity>;

    findByName(email: string): Promise<InventoryEntity>;

    findByCategory(category: string): Promise<InventoryEntity[]>;

    deleteInventory(id: string): Promise<void>;

    updateInventory(id: string, name: string, description: string, price: number, quantity: number, image: string, category: string, misc: string): Promise<InventoryEntity>;

    updateQuantity(id: string, quantity: number): Promise<InventoryEntity>;

    getInventoryByIDs(ids: string[]): Promise<InventoryEntity[]>;
}

export const customTicketRepositoryMethods: Pick<
    InventoryRepository,
    'createInventory' | 'findByID' | 'findByName' | 'findByCategory' | 'deleteInventory' | 'updateInventory' | 'updateQuantity' | 'getInventoryByIDs'
> = {
    async createInventory(
        name: string,
        description: string,
        price: number,
        quantity: number,
        image: string,
        category: string,
        misc: string,
    ): Promise<InventoryEntity> {
        const ticket = new InventoryEntity();
        ticket.id = ulid();
        ticket.name = name;
        ticket.description = description;
        ticket.price = price;
        ticket.quantity = quantity;
        ticket.image = image;
        ticket.category = category;
        ticket.misc = misc;
        return await this.save(ticket);
    },

    async findByID(id: string): Promise<InventoryEntity> {
        return await this.findOne({where: {id}});
    },

    async findByName(name: string): Promise<InventoryEntity> {
        return await this.findOne({where: {name}});
    },

    async findByCategory(category: string): Promise<InventoryEntity[]> {
        return await this.find({where: {category}});
    },

    async deleteInventory(id: string): Promise<void> {
        return await this.delete({id});
    },

    async updateInventory(id: string, name: string, description: string, price: number, quantity: number, image: string, category: string, misc: string): Promise<InventoryEntity> {
        const ticket = await this.findByID(id);
        ticket.name = name;
        ticket.description = description;
        ticket.price = price;
        ticket.quantity = quantity;
        ticket.image = image;
        ticket.category = category;
        ticket.misc = misc;
        return await this.save(ticket);
    },

    async updateQuantity(id: string, quantity: number): Promise<InventoryEntity> {
        const ticket = await this.findByID(id);
        ticket.quantity = quantity;
        return await this.save(ticket);
    },

    async getInventoryByIDs(ids: string[]): Promise<InventoryEntity[]> {
        return await this.findByIds(ids);
    }
};
