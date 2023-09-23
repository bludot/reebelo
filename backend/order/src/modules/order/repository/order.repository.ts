import {OrderEntity} from './order.entity';
import {Repository} from 'typeorm';
import {ulid} from 'ulid';

export enum OrderStatus {
    CREATED = 'created',
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    DELIVERED = 'delivered',
}

export interface OrderRepository extends Repository<OrderEntity> {
    this: Repository<OrderEntity>;

    createOrder(parentId: string, userId: string, address: string, itemId: string, quantity: number, status: string): Promise<OrderEntity>;


    findByID(id: string): Promise<OrderEntity>;

    findByUserID(userId: string): Promise<OrderEntity[]>;

    deleteOrder(id: string): Promise<void>;

    updateOrderShipping(id: string, address: string, trackingNumber?: string): Promise<OrderEntity>;

    updateStatus(id: string, status: OrderStatus): Promise<OrderEntity>;

    updateOrderQuantity(id: string, quantity: number): Promise<OrderEntity>;

    findOrderByParentId(parentId: string): Promise<OrderEntity[]>;
}

export const customOrderRepositoryMethods: Pick<
    OrderRepository,
    'createOrder' | 'findByID' | 'findByUserID' | 'deleteOrder' | 'updateOrderShipping' | 'updateStatus' | 'updateOrderQuantity' | 'findOrderByParentId'
> = {
    createOrder(parentId: string, userId: string, address: string, itemId: string, quantity: number, status: string): Promise<OrderEntity> {
        const order = new OrderEntity();
        order.id = ulid();
        order.parentId = parentId;
        order.userId = userId;
        order.address = address;
        order.itemId = itemId;
        order.quantity = quantity;
        order.status = status;
        return this.save(order);
    },

    findByID(id: string): Promise<OrderEntity> {
        return this.findOne({where: {id}});
    },

    findByUserID(userId: string): Promise<OrderEntity[]> {
        return this.find({userId});
    },

    async deleteOrder(id: string): Promise<void> {
        return this.delete(id);
    },

    async updateOrderShipping(id: string, address: string, trackingNumber?: string): Promise<OrderEntity> {
        return this.findOneOrFail(id).then((order) => {
            order.address = address;
            order.trackingNumber = trackingNumber;
            return this.save(order);
        });
    },

    updateStatus(id: string, status: OrderStatus): Promise<OrderEntity> {
        return this.findOneOrFail(id).then((order) => {
            order.status = status;
            return this.save(order);
        });
    },

    updateOrderQuantity(id: string, quantity: number): Promise<OrderEntity> {
        return this.findOneOrFail(id).then((order) => {
            order.quantity = quantity;
            return this.save(order);
        });
    },

    async findOrderByParentId(parentId: string): Promise<OrderEntity[]> {
        return this.find({parentId});
    }

};
