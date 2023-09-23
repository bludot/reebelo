import {Inject, UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Logger} from 'winston';
import {CreateOrderInput, Order, OrderStatus as GQLOrderStatus} from '../../graphql';
import {AuthGraphqlGuard} from '../auth/auth.graphql.guard';
import {OrderService} from "../order/order.service";
import {OrderStatus} from "../order/repository/order.repository";
import {OrderEntity} from "../order/repository/order.entity";


function dbOrderStatusToGQLOrderStatus(status: OrderStatus): GQLOrderStatus {
    switch (status) {
        case OrderStatus.CREATED:
            return GQLOrderStatus.CREATED;
        case OrderStatus.PENDING:
            return GQLOrderStatus.PENDING;
        case OrderStatus.COMPLETED:
            return GQLOrderStatus.COMPLETED;
        case OrderStatus.CANCELLED:
            return GQLOrderStatus.CANCELLED;
        case OrderStatus.DELIVERED:
            return GQLOrderStatus.DELIVERED;
        default:
            return GQLOrderStatus.PENDING;
    }
}

@Resolver()
export class OrderResolvers {
    constructor(
        @Inject('winston') private readonly logger: Logger,
        private readonly orderService: OrderService,
    ) {
    }

    @Mutation('createOrder')
    @UseGuards(AuthGraphqlGuard)
    async createOrder(@Args('input') args: CreateOrderInput): Promise<Order> {
        this.logger.info('Creating order');
        if (!args.parentId) {
            const parentOrder = await this.orderService.createOrder(
                args.parentId,
                args.userId,
                args.address,
                null,
                null,
                OrderStatus.CREATED,
            );
            const order = await this.orderService.createOrder(
                parentOrder.id,
                args.userId,
                args.address,
                args.itemId,
                args.quantity,
                OrderStatus.CREATED,
            );

            return {
                id: parentOrder.id,
                parentId: parentOrder.parentId,
                userId: parentOrder.userId,
                address: parentOrder.address,
                trackingNumber: parentOrder.trackingNumber,
                itemIds: [order.itemId],
                quantity: [order.quantity],
                status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
                createdAt: parentOrder.createdAt,
                updatedAt: parentOrder.updatedAt,
            }
        }
        const parentOrder = await this.orderService.findByID(args.parentId);
        const order = await this.orderService.createOrder(
            args.parentId,
            args.userId,
            args.address || parentOrder.address,
            args.itemId,
            args.quantity,
            OrderStatus.CREATED,
        );

        return {
            id: order.id,
            parentId: order.parentId,
            userId: order.userId,
            address: order.address,
            trackingNumber: order.trackingNumber,
            itemIds: [order.itemId],
            quantity: [order.quantity],
            status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }


    }

    @Query('order')
    @UseGuards(AuthGraphqlGuard)
    async getOrder(@Args('id') id: string): Promise<Order> {
        this.logger.info('Getting order by id');
        const order = await this.orderService.findByID(id);
        if (order.parentId) {
            return {
                id: order.id,
                parentId: order.parentId,
                userId: order.userId,
                address: order.address,
                trackingNumber: order.trackingNumber,
                itemIds: [order.itemId],
                quantity: [order.quantity],
                status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
            };
        }

        const parentOrder: Order = {
            id: order.id,
            parentId: order.parentId,
            userId: order.userId,
            address: order.address,
            trackingNumber: order.trackingNumber,
            itemIds: [],
            quantity: [],
            status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }
        const orders = await this.orderService.findOrderByParentId(order.id);
        orders.forEach((o) => {
            order.quantity += o.quantity;
            order.itemId += o.itemId;
        })
        return parentOrder;
    }

    @Query('ordersByUser')
    @UseGuards(AuthGraphqlGuard)
    async getOrdersByUser(@Args('userId') userId: string): Promise<Order[]> {
        this.logger.info(`Getting orders by usser id: ${userId}`);
        const orders = await this.orderService.findByUserID(userId);
        const parentOrders: Order[] = orders.filter((o) => o.parentId === null).map((o: OrderEntity): Order => ({
            id: o.id,
            parentId: o.parentId,
            userId: o.userId,
            address: o.address,
            trackingNumber: o.trackingNumber,
            itemIds: [],
            quantity: [],
            status: dbOrderStatusToGQLOrderStatus(OrderStatus[o.status]),
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,

        }));

        orders.forEach((order: OrderEntity) => {
            if (order.parentId) {
                const parentOrder = parentOrders.find((o) => o.id === order.parentId);
                if (parentOrder) {
                    parentOrder.quantity.push(order.quantity);
                    parentOrder.itemIds.push(order.itemId);
                }
            }
        })


        return parentOrders;
    }

    @Mutation('updateOrderShipping')
    @UseGuards(AuthGraphqlGuard)
    async updateOrderShipping(@Args('id') id: string, @Args('address') address: string, @Args('trackingNumber') trackingNumber?: string): Promise<Order> {
        this.logger.info('Updating order shipping');
        const foundOrder = await this.orderService.findByID(id);
        if (foundOrder.parentId) {
            throw new Error('Cannot update shipping address of child order');
        }
        const parentOrder = await this.orderService.updateOrderShipping(id, address, trackingNumber);
        const parentOrderOrder: Order = {
            id: parentOrder.id,
            parentId: parentOrder.parentId,
            userId: parentOrder.userId,
            address: parentOrder.address,
            trackingNumber: parentOrder.trackingNumber,
            itemIds: [],
            quantity: [],
            status: GQLOrderStatus[parentOrder.status],
            createdAt: parentOrder.createdAt,
            updatedAt: parentOrder.updatedAt,
        }
        const orders = await this.orderService.findOrderByParentId(id);

        orders.forEach((o) => {
            parentOrderOrder.quantity.push(o.quantity);
            parentOrderOrder.itemIds.push(o.itemId);
        })

        return parentOrderOrder

    }

    @Mutation('updateOrderStatus')
    @UseGuards(AuthGraphqlGuard)
    async updateOrderStatus(@Args('id') id: string, @Args('status') status: GQLOrderStatus): Promise<Order> {
        this.logger.info('Updating order status');
        const foundOrder = await this.orderService.findByID(id);
        if (foundOrder.parentId) {
            throw new Error('Cannot update shipping address of child order');
        }
        const parentOrder = await this.orderService.updateStatus(id, OrderStatus[status])
        const parentOrderOrder: Order = {
            id: parentOrder.id,
            parentId: parentOrder.parentId,
            userId: parentOrder.userId,
            address: parentOrder.address,
            trackingNumber: parentOrder.trackingNumber,
            itemIds: [],
            quantity: [],
            status: GQLOrderStatus[parentOrder.status],
            createdAt: parentOrder.createdAt,
            updatedAt: parentOrder.updatedAt,
        }
        const orders = await this.orderService.findOrderByParentId(id);

        orders.forEach((o) => {
            parentOrderOrder.quantity.push(o.quantity);
            parentOrderOrder.itemIds.push(o.itemId);
        })

        return parentOrderOrder

    }

    @Mutation('deleteOrder')
    @UseGuards(AuthGraphqlGuard)
    async deleteOrder(@Args('id') id: string): Promise<Order> {
        this.logger.info('Deleting order');
        const order = await this.orderService.deleteOrder(id);

        return {
            id: order.id,
            parentId: order.parentId,
            userId: order.userId,
            address: order.address,
            trackingNumber: order.trackingNumber,
            itemIds: [order.itemId],
            quantity: [order.quantity],
            status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }

    @Mutation('updateOrderQuantity')
    @UseGuards(AuthGraphqlGuard)
    async updateOrderQuantity(@Args('id') id: string, @Args('quantity') quantity: number): Promise<Order> {
        this.logger.info('Updating order quantity');
        const order = await this.orderService.updateOrderQuantity(id, quantity)

        return {
            id: order.id,
            parentId: order.parentId,
            userId: order.userId,
            address: order.address,
            trackingNumber: order.trackingNumber,
            itemIds: [order.itemId],
            quantity: [order.quantity],
            status: dbOrderStatusToGQLOrderStatus(OrderStatus[order.status]),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        };
    }


}
