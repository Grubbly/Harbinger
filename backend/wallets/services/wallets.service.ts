import WalletsDao from "../daos/wallets.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { CreateWalletDto } from "../dto/create.wallets.dto";
import { PutWalletDto } from "../dto/put.wallets.dto";
import { PatchWalletDto } from "../dto/patch.wallets.dto";
class WalletsService implements CRUD {
    async create(resource: CreateWalletDto) {
        return WalletsDao.addWallet(resource);
    }

    async deleteById(id: string) {
        return WalletsDao.removeWalletById(id);
    }

    async list(limit: number, page: number) {
        return WalletsDao.getWallets(limit, page);
    }

    async patchById(id: string, resource: PatchWalletDto) {
        return WalletsDao.updateWalletById(id, resource);
    }

    async readById(id: string) {
        return WalletsDao.getWalletById(id);
    }

    async putById(id: string, resource: PutWalletDto) {
        return WalletsDao.updateWalletById(id, resource);
    }

    async getWalletByEmail(email: string) {
        return WalletsDao.getWalletByEmail(email);
    }
}

export default new WalletsService();