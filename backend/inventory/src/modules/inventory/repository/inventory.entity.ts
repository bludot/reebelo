import {Column, CreateDateColumn, Entity, UpdateDateColumn} from 'typeorm';

@Entity({name: 'ticket'})
export class InventoryEntity {
    @Column({name: 'id', unique: true, primary: true})
    id: string;

    @Column({name: 'name', unique: true})
    name: string;

    @Column({name: 'description'})
    description: string;

    @Column({name: 'price', type: 'bigint'})
    price: number;

    @Column({name: 'quantity', type: 'bigint'})
    quantity: number;

    @Column({name: 'image',  nullable: true})
    image: string;

    @Column({name: 'category', nullable: true})
    category: string;

    // holds extra data like size.
    @Column({name: 'misc', nullable: true})
    misc: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
