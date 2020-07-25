import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { OrderDetail } from './OrderDetail';
import { Transaction } from './Transaction';

enum InvoiceStatus {
    notpaid,
    paid,
    partiallypaid
}

@Entity()
export class Invoice {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @CreateDateColumn()
    date: Date

    @Column()
    duedate: Date

    @ManyToOne(type => OrderDetail, orderdetail => orderdetail)
    order: OrderDetail

    @Column('int', {
        default: InvoiceStatus.notpaid
    })
    status: InvoiceStatus

    @OneToMany(type=> Transaction, trct => trct.invoice)
    payments: Transaction[]

    @Column()
    balance: number

}
