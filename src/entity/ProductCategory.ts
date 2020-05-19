import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class ProductCategory {


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column('text')
    description: string

    @OneToMany(type => Product, product => product.category)
    products: Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}