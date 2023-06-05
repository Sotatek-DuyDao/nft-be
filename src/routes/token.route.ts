import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { TokenController } from '@/controllers/token.controller';
import { CreateTokenDto, TransferTokenOwnerDto } from '@/dtos/token.dto';

export class TokenRoute implements Routes {
    public path = '/tokens';
    public router = Router();
    public token = new TokenController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.token.getAllTokens);
        this.router.get(`${this.path}/:id`, this.token.getTokenById);
        this.router.get(`${this.path}/my/:walletId`, this.token.getMyToken);
        this.router.get(`${this.path}/created/:walletId`, this.token.getTokensCreated);
        this.router.post(`${this.path}`, ValidationMiddleware(CreateTokenDto), this.token.createToken);
        this.router.post(`${this.path}/transfer`, ValidationMiddleware(TransferTokenOwnerDto), this.token.transferTokenOwner);
    }
}