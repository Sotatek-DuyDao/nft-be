import { IUserCollection } from "@/interfaces/collection.interface";
import { AppBaseEntity } from "./base.entity";
import { UserEntity } from "./users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_collection")
export class UserCollectionEntity extends AppBaseEntity implements IUserCollection{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @OneToOne(() => UserEntity)
    @JoinColumn({name: "wallet_id"})
    walletId: UserEntity;
}