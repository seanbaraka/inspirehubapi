import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne, ManyToMany, JoinTable, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { Customer } from "./Customer";
import { Invoice } from "./Invoice";


// enum OrderStatus {
//     processing, // payment has been received and customer is awaiting products
//     pending_payment, // order is placed but payment has not been initiated
//     completed, // order is fulfilled and complete
//     on_hold, //delivered but awaiting payment
//     cancelled, // order is cancelled either by the customer or admin
//     refunded // order has been cancelled and refunded by the admin
// }

@Entity()
export class OrderDetail {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    orderNumber: string
    
    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column('float')
    amount: number

    @Column({
        default: 'pending'
    })
    status: string

    @ManyToOne(type => Customer, customer => customer.orders)
    customer: Customer

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[]

    @OneToMany(type => Invoice, inv => inv.order)
    invoices: Invoice[]

}