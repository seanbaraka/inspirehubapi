import { User } from "./User";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { OrderDetail } from "./Order";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => User, user => user.customers)
    user: User


    @Column()
    address: string;

    @Column()
    telephone: string;

    @OneToMany(type => OrderDetail, order => order.customer)
    orders: OrderDetail[]


}