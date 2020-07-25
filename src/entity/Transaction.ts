import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne, ManyToOne, Column } from "typeorm";
import { Invoice } from "./Invoice";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refNumber: string

    @Column()
    modeOfPayment: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(type => Invoice, invs => invs.payments)
    invoice: Invoice

    @Column()
    amountPaid: number


}