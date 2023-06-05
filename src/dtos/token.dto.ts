import { IToken } from "@/interfaces/token.interface";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTokenDto implements Omit<IToken, "ownerId" | "creatorId">{
    @IsNotEmpty()
    @IsString()
    tokenURI: string;
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsString()
    creatorId: string;
    @IsNotEmpty()
    @IsString()
    ownerId: string;
    @IsNotEmpty()
    @IsString()
    price: string;
}
export class TransferTokenOwnerDto {
    @IsNotEmpty()
    @IsString()
    id: string;
    @IsNotEmpty()
    @IsString()
    ownerId: string;
    @IsNotEmpty()
    @IsString()
    creatorId?: string;
    @IsOptional()
    @IsString()
    price?: string;
    @IsNotEmpty()
    @IsBoolean()
    isResell: boolean;
}
export class GetTokensDto{
    walletId: string
}