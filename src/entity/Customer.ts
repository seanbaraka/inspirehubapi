import { User } from "./User";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { OrderDetail } from "./OrderDetail";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    cust_id: number

    @ManyToOne(type => User, user => user.customers, {
        cascade: true
    })
    user: User

    @Column()
    address: string;

    @Column()
    telephone: string;

    @OneToMany(type => OrderDetail, order => order.customer)
    orders: OrderDetail[]

}