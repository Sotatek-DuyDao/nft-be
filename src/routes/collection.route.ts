import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { UserCollectionController } from '@/controllers/collection.controller';
import { CreateCollectionDto } from '@/dtos/collection.dto';

export class UserCollectionRoute implements Routes {
    public path = '/collections';
    public router = Router();
    public collection = new UserCollectionController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:walletId`, this.collection.getMyCollection);
        this.router.post(`${this.path}`, ValidationMiddleware(CreateCollectionDto), this.collection.createCollection);
    }
}