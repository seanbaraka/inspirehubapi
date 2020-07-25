import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Customer} from "./Customer";
import {Product} from "./Product";

@Entity()
export class Quotation {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    number: string;

    @Column('text')
    description: string;

    @Column()
    amount: number

    @ManyToOne(type => Customer, c => c.quotations)
    customer: Customer;

    @ManyToMany(type => Product, p => p.quotations)
    @JoinTable()
    products: Product[];

}
