import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Wallet extends BaseEntity {

    @PrimaryColumn()
    id!: string;

    @Column()
    email!: string
    
    @Column({
        type: String,
        select: false
    })
    password!: string

    @Column({
        nullable: true
    })
    firstName?: string
    
    @Column({
        nullable: true
    })
    lastName?: string
    
    @Column({
        nullable: true
    })
    permissionFlags?: number
}