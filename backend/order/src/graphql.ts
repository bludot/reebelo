
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrderStatus {
    CREATED = "CREATED",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED"
}

export class UpdateOrderStatusInput {
    id: string;
    status: OrderStatus;
}

export class CreateOrderInput {
    userId: string;
    parentId?: Nullable<string>;
    address?: Nullable<string>;
    itemId?: Nullable<string>;
    quantity?: Nullable<number>;
}

export class UpdateOrderInput {
    id: string;
    parentId?: Nullable<string>;
    address?: Nullable<string>;
    itemId?: Nullable<string>;
    quantity?: Nullable<number>;
}

export class DeleteOrderInput {
    id: string;
}

export abstract class IQuery {
    abstract hello(): string | Promise<string>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;

    abstract ordersByUser(userId: string): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;
}

export class Order {
    id: string;
    parentId?: Nullable<string>;
    userId: string;
    address: string;
    trackingNumber?: Nullable<string>;
    itemIds?: Nullable<Nullable<string>[]>;
    quantity?: Nullable<Nullable<number>[]>;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

export abstract class IMutation {
    abstract updateOrderStatus(input: UpdateOrderStatusInput): Nullable<Order> | Promise<Nullable<Order>>;

    abstract createOrder(input: CreateOrderInput): Nullable<Order> | Promise<Nullable<Order>>;

    abstract updateOrder(input: UpdateOrderInput): Nullable<Order> | Promise<Nullable<Order>>;

    abstract deleteOrder(input: DeleteOrderInput): Nullable<Order> | Promise<Nullable<Order>>;
}

export type _Any = any;
export type _FieldSet = any;
type Nullable<T> = T | null;
