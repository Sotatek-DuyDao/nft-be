import { IsNotEmpty, IsString } from "class-validator";

export class CreateCollectionDto{
    @IsNotEmpty()
    @IsString()
    walletId: string;
    @IsNotEmpty()
    @IsString()
    name: string;
}