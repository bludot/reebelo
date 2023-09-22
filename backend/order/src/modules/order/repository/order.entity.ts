import {Column, CreateDateColumn, Entity, UpdateDateColumn} from 'typeorm';

@Entity({name: 'order'})
export class OrderEntity {
    @Column({name: 'id', unique: true, primary: true})
    id: string;

    @Column({name: 'parent_id', nullable: true})
    parentId: string;

    @Column({name: 'user_id'})
    userId: string;

    @Column({name: 'address'})
    address: string;

    @Column({name: 'tracking_number', nullable: true})
    trackingNumber: string;

    @Column({name: 'item_id', nullable: true})
    itemId: string

    @Column({name: 'quantity', type: 'bigint', nullable: true})
    quantity: number;

    @Column({name: 'status'})
    status: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
