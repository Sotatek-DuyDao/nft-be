import { ethers } from "ethers";
import nftABI from "../../NftMarketPlace.json";
import Container from "typedi";
import { TokenService } from "@/services/token.service";
export async function watchSmartContractEvent() {
    const tokenService = Container.get(TokenService);
    const usdtAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const contract = new ethers.Contract(usdtAddress, nftABI.abi, provider);
    contract.on("MarketItemCreated", (tokenURI, tokenId, seller, owner, price, sold, timestamp) => {
        console.log("New NFT", { tokenURI, tokenId, seller, owner, price, sold, timestamp });
        tokenService.createToken({ tokenURI, id: tokenId.toString(), creatorId: seller, ownerId: owner, price: ethers.utils.formatEther(price.toString()) }).catch(e => console.log("e", e))
    })
    contract.on("CreateMarketSale", (tokenId, seller, newOwner) => {
        console.log("CreateMarketSale", { tokenId: tokenId.toString(), seller, newOwner });
        tokenService.transferTokenOwner({ id: tokenId.toString(), ownerId: newOwner, isResell: false })
    })
    contract.on("ResellToken", (tokenId, newCreator, newOwner, newPrice) => {
        console.log("ResellToken", { tokenId, newOwner, newPrice, newCreator });
        tokenService.transferTokenOwner({ id: tokenId.toString(),creatorId:newCreator.toString(), ownerId: newOwner, price: ethers.utils.formatEther(newPrice.toString()), isResell: true })
    })
}