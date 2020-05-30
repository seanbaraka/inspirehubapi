import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { OrderDetail } from './OrderDetail';

enum InvoiceStatus {
    notpaid,
    paid
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
}
