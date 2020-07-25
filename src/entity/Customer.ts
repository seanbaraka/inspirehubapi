import { User } from "./User";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, OneToMany } from "typeorm";
import { OrderDetail } from "./OrderDetail";
import {Quotation} from "./Quotation";
import { Statement } from "./Statement";

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

    @OneToMany(type => Quotation, qt => qt.customer)
    quotations: Quotation[]

    @OneToMany(type => Statement, stmt => stmt.customer)
    statements: Statement[]

}
