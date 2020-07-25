import { PrimaryGeneratedColumn, CreateDateColumn, Entity, OneToMany, OneToOne, JoinTable, Column, UpdateDateColumn, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { Transaction } from "./Transaction";

@Entity()
export class Statement {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type=>Customer, cust => cust.statements)
    customer: Customer

    @Column()
    refNumber: string

    @Column()
    description: string

    @Column({
        default: 0.00
    })
    debit: number

    @Column({
        default: 0.00
    })
    credit: number

    @Column()
    balance: number
    
}