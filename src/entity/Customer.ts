import { User } from "./User";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./Order";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    customer_id: number

    @ManyToOne(type => User, user => user.customers)
    user: User

    @OneToMany(type => Order, order => order.customer)
    orders: Order[]

    @Column()
    address: string;

    @Column()
    telephone: string;


}