import { User } from "./User";
import { ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    admin_id: number

    @ManyToOne(type => User, user=> user.admins)
    user: User


}