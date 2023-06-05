import { CreateTokenDto, TransferTokenOwnerDto } from "@/dtos/token.dto";
import { ISort } from "@/interfaces/token.interface";
import { TokenService } from "@/services/token.service";
import { NextFunction, Request, Response } from "express";
import Container from "typedi";

export class TokenController {
    public tokenService = Container.get(TokenService)
    public createToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: CreateTokenDto = req.body;
            await this.tokenService.createToken(token);
            return res.status(200).json({ success: true })
        }
        catch (error) {
            next(error);
        }
    }
    public transferTokenOwner = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token: TransferTokenOwnerDto = req.body;
            const result = await this.tokenService.transferTokenOwner(token);
            return res.status(200).json(result)
        }
        catch (error) {
            next(error);
        }
    }
    public getTokensCreated = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.params.walletId)
            const walletId: string = req.params.walletId;
            const result = await this.tokenService.getTokensCreated(walletId)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
    public getMyToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const walletId: string = req.params.walletId;
            const result = await this.tokenService.getMyToken(walletId)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
    public getAllTokens = async (req: Request<any, any, any, ISort>, res: Response, next: NextFunction) => {
        try {
            const { page = 1, sort = "1", isAdmin = false }: ISort = req.query;
            const result = await this.tokenService.getAllToken(page, sort, isAdmin)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
    public getTokenById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.tokenService.getTokenById(req.params.id)
            return res.status(200).json({ success: true, data: result })
        }
        catch (error) {
            next(error);
        }
    }
}