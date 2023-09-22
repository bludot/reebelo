
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateInventoryInput {
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: Nullable<string>;
    category?: Nullable<string>;
    misc?: Nullable<string>;
}

export class UpdateInventoryInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    quantity?: Nullable<number>;
    image?: Nullable<string>;
    category?: Nullable<string>;
    misc?: Nullable<string>;
}

export class UpdateInventoryQuantityInput {
    id: string;
    quantity: number;
}

export class Order {
    id: string;
    itemIds: string[];
    quantity: number[];
    items: Inventory[];
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract inventory(id: string): Nullable<Inventory> | Promise<Nullable<Inventory>>;

    abstract inventoryByName(name: string): Inventory | Promise<Inventory>;

    abstract inventoryByCategory(category: string): Nullable<Inventory[]> | Promise<Nullable<Inventory[]>>;
}

export class Inventory {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image?: Nullable<string>;
    category?: Nullable<string>;
    misc?: Nullable<string>;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class IMutation {
    abstract createInventory(input: CreateInventoryInput): Inventory | Promise<Inventory>;

    abstract updateInventory(input: UpdateInventoryInput): Inventory | Promise<Inventory>;

    abstract deleteInventory(id: string): Inventory | Promise<Inventory>;

    abstract updateInventoryQuantity(input: UpdateInventoryQuantityInput): Inventory | Promise<Inventory>;
}

type Nullable<T> = T | null;
