import {Inject, Injectable} from '@nestjs/common';
import {Logger} from 'winston';
import {InjectRepository} from '@nestjs/typeorm';
import {OrderEntity} from './repository/order.entity';
import {OrderStatus, OrderRepository} from './repository/order.repository';

@Injectable()
export class OrderService {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: OrderRepository,
    ) {
    }

    async createOrder(parentId: string, userId: string, address: string, itemId: string, quantity: number, status: string): Promise<OrderEntity> {
        this.logger.info('Creating order');
        return this.orderRepository.createOrder(parentId, userId, address, itemId, quantity, status);
    }

    async findByID(id: string): Promise<OrderEntity> {
        this.logger.info('Getting order by id');
        return this.orderRepository.findByID(id);
    }

    async findByUserID(userId: string): Promise<OrderEntity[]> {
        this.logger.info('Getting order by user id');
        return this.orderRepository.findByUserID(userId);

    }

    async deleteOrder(id: string): Promise<OrderEntity> {
        this.logger.info('Deleting order');
        const order = await this.orderRepository.findByID(id);
        await this.orderRepository.deleteOrder(id);

        return order
    }

    async updateOrderShipping(id: string, address: string, trackingNumber?: string): Promise<OrderEntity> {
        this.logger.info('Updating order shipping');
        return this.orderRepository.updateOrderShipping(id, address, trackingNumber);
    }

    async updateStatus(id: string, status: OrderStatus): Promise<OrderEntity> {
        this.logger.info('Updating order status');
        return this.orderRepository.updateStatus(id, status);
    }

    async updateOrderQuantity(id: string, quantity: number): Promise<OrderEntity> {
        this.logger.info('Updating order quantity');
        return this.orderRepository.updateOrderQuantity(id, quantity);
    }

    async findOrderByParentId(parentId: string): Promise<OrderEntity[]> {
        this.logger.info('Getting order by parent id');
        return this.orderRepository.findOrderByParentId(parentId);
    }
}
