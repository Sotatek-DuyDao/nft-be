import { CreateTokenDto, TransferTokenOwnerDto } from "@/dtos/token.dto";
import { TokenEntity } from "@/entities/token.entity";
import { UserEntity } from "@/entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { SortMapping } from "@/interfaces/token.interface";
import Container, { Service } from "typedi";
import { Repository } from "typeorm";
import { UserService } from "./users.service";
import { ProfileEntity } from "@/entities/profile.entity";
import { AppDataSource } from "@/database";

@Service()
export class TokenService extends Repository<TokenEntity>{
    public userService = Container.get(UserService);
    public async createToken(token: CreateTokenDto) {
        const currentToken = await TokenEntity.findOne({
            where: { id: token.id }
        })
        if (!currentToken) {
            let currentCreator = await UserEntity.findOne({
                where: { walletId: token.creatorId }
            })
            let currentOwner = await UserEntity.findOne({
                where: { walletId: token.ownerId }
            })
            if (!currentCreator) {
                currentCreator = await this.userService.createUser({ walletId: token.creatorId })
            }
            if (!currentOwner) {
                currentOwner = await this.userService.createUser({ walletId: token.ownerId })
            }
            const newToken = new TokenEntity()
            newToken.id = token.id;
            newToken.price = token.price;
            newToken.tokenURI = token.tokenURI;
            newToken.creatorId = currentCreator;
            newToken.ownerId = currentOwner;
            newToken.sold = false;
            return newToken.save()
        }
    }
    public async getTokensCreated(walletId: string) {
        return TokenEntity.find({
            where: { creatorId: true }
        })
    }
    public async getMyToken(walletId: string) {
        const tokenRepo = AppDataSource.getRepository(TokenEntity);
        return tokenRepo.find({
            where: { ownerId: { walletId: walletId } },
            relations: ["ownerId"]
        })
    }
    public async getAllToken(page: number, sort: string, isAdmin: boolean) {
        const itemPerPage = 10;
        const offset = (page - 1) * itemPerPage;
        return TokenEntity.find({
            ...(!isAdmin && { where: { sold: false } }),
            order: SortMapping[sort],
            take: itemPerPage,
            skip: offset
        })
    }
    public async getTokenById(tokenId: string) {
        const tokenRepo = AppDataSource.getRepository(TokenEntity);
        return tokenRepo.findOne({
            where: { id: tokenId },
            relations: ["ownerId", "creatorId"]
        })
    }
    public async transferTokenOwner(token: TransferTokenOwnerDto) {
        const currentToken = await TokenEntity.findOne({
            where: { id: token.id },
        })
        if (!currentToken) {
            throw new HttpException(404, "Token not found")
        }
        let newOwner = await UserEntity.findOne({
            where: {
                walletId: token.ownerId
            }
        })
        if (!newOwner) {
            const newProfile = await new ProfileEntity().save();
            newOwner = new UserEntity();
            newOwner.walletId = token.ownerId;
            newOwner.profile = newProfile;
            await newOwner.save();
            return newOwner;
        }
        let currentCreator = null;
        if (token.creatorId) {
            currentCreator = await UserEntity.findOne({
                where: {
                    walletId: token.creatorId
                }
            })
        }
        await TokenEntity.update({ id: currentToken.id }, { ownerId: newOwner, sold: token.isResell ? false : true, ...(currentCreator && { price: token.price }), ...(token.creatorId && { creatorId: currentCreator }) })
        return { success: true }
    }
}