import { CreateCollectionDto } from "@/dtos/collection.dto";
import { UserCollectionEntity } from "@/entities/collection.entity";
import { UserEntity } from "@/entities/users.entity";
import { HttpException } from "@/exceptions/httpException";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

@Service()
@EntityRepository()
export class CollectionService extends Repository<UserCollectionEntity>{
    public async createCollection(collection: CreateCollectionDto){
        const currentCollection = await UserCollectionEntity.findOne({
            where: {name: collection.name, walletId: collection.walletId}
        })
        if(currentCollection){
            throw new HttpException(400, "Collection exits")
        }
        const currentCreator = await UserEntity.findOne({
            where: {walletId: collection.walletId}
        })
        const newCollection = new UserCollectionEntity()
        newCollection.name  = collection.name;
        newCollection.walletId = currentCreator;
        await newCollection.save();
        return {success: true}
    }
    public async getMyCollection(walletId: string){
        return UserCollectionEntity.find({
            where: {
                walletId
            }
        })
    }
}