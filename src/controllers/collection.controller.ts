import { CreateCollectionDto } from "@/dtos/collection.dto";
import { CollectionService } from "@/services/collection.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class UserCollectionController {
    public collectionService = Container.get(CollectionService)
    public createCollection = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const collection: CreateCollectionDto = req.body;
            await this.collectionService.createCollection(collection);
            return res.status(200).json({ success: true })
        }
        catch (error) {
            next(error);
        }
    }
    public getMyCollection = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.collectionService.getMyCollection(req.params.walletId);
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
}
interface ITest{
    log: () => void;
}