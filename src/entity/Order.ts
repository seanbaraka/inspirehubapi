import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./Product";
import { Customer } from "./Customer";


enum OrderStatus {
    "processing", // payment has been received and customer is awaiting products
    "pending payment", // order is placed but payment has not been initiated
    "completed", // order is fulfilled and complete
    "on hold", //delivered but awaiting payment
    "cancelled", // order is cancelled either by the customer or admin
    "refunded" // order has been cancelled and refunded by the admin
}


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @Column('float')
    amount: number

    @Column('int')
    status: OrderStatus

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[]

    @ManyToOne(type => Customer, cust => cust.orders)
    customer: Customer
}