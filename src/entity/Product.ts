import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from "typeorm";
import { ProductCategory } from "./ProductCategory";
import { OrderDetail } from "./OrderDetail";
import {type} from "os";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column('text')
    description: string

    @ManyToOne(type => ProductCategory, pc => pc.products, {
        cascade: true
    })
    category: ProductCategory

    @Column('float')
    price: number

    @ManyToMany(type => OrderDetail, od=> od.products)
    orders: OrderDetail[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
