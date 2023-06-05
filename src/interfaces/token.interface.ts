import { UserEntity } from "@/entities/users.entity";

export interface IToken{
    id: string;
    tokenURI: string;
    creatorId: UserEntity;
    ownerId: UserEntity;
    price: string;
}
export interface ISort{
    page: number,
    sort: "1" | "2" | "3",
    isAdmin: boolean
}
export const SortMapping = {
    "1": {price: "ASC"},
    "2": {price: "DESC"},
    "3": {createdAt: "ASC"}
}