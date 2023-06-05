import { UserEntity } from "@/entities/users.entity";

export interface IUserCollection {
    name: string;
    walletId: UserEntity;
}