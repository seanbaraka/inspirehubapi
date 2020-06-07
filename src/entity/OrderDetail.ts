import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne, ManyToOne, ManyToMany, JoinTable, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { Customer } from "./Customer";
import { Invoice } from "./Invoice";


enum OrderStatus {
    processing, // payment has been received and customer is awaiting products
    pending, // order is placed but payment has not been initiated
    completed, // order is fulfilled and complete
    cancelled, // order is cancelled either by the customer or admin
}

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

    @Column('int',{
        default: OrderStatus.processing
    })
    status: OrderStatus

    @ManyToOne(type => Customer, customer => customer.orders)
    customer: Customer

    @ManyToMany(type => Product, p => p.orders)
    @JoinTable()
    products: Product[]

    @OneToMany(type => Invoice, inv => inv.order)
    invoices: Invoice[]

}
