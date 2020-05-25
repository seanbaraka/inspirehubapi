import { Entity, PrimaryGeneratedColumn,  Column, ManyToOne, OneToMany } from "typeorm";
import { Role } from "./Role";
import { Customer } from "./Customer";
import { Admin } from "./Admin";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column()
    emailAddress: string;

    @ManyToOne(type => Role, role => role.users, {
        cascade: true
    })
    role: Role

    @OneToMany(type => Customer, customer => customer.user)
    customers: Customer[]

    @OneToMany(type => Admin, admin => admin.user)
    admins: Admin[]


}
