import { CreateWalletDto } from "../dto/create.wallets.dto";
import { PutWalletDto } from "../dto/put.wallets.dto";
import { PatchWalletDto } from "../dto/patch.wallets.dto";
import shortid from "shortid";
import debug from "debug";
import { Wallet } from "../entities/wallets.entity";

const log: debug.IDebugger = debug('app:wallet-dao');

class WalletsDao {

    constructor() {
        log('Created new instance of WalletsDao');
    }

    async addWallet(walletFields: CreateWalletDto) {
        const wallet = new Wallet();
        const walletId = shortid.generate();
        
        wallet.id = walletId;
        wallet.email = walletFields.email;
        wallet.password = walletFields.password;
        wallet.firstName = walletFields.firstName;
        wallet.lastName = walletFields.lastName;
        wallet.permissionFlags = walletFields.permissionFlags;        

        await wallet.save();
        log(`Successfully inserted wallet: ${wallet}`);
        return walletId;
    }

    // Get all wallets with pagination support
    async getWallets(limit = 25, page = 0) {
        return Wallet.find({
            take: limit,
            skip: limit*page
        });
    }

    async getWalletById(walletId: string) {
        return Wallet.findOne({ id: walletId });
    }

    async getWalletByEmail(email: string) {
        return Wallet.findOne({email: email} );
    }

    async updateWalletById(
        walletId: string,
        walletFields: PatchWalletDto | PutWalletDto
    ) {
        const existingWallet = await Wallet.update(
            { id: walletId },
            walletFields
        );

        return existingWallet;
    }

    async removeWalletById(walletId: string) {
        return Wallet.delete({ id: walletId });
    }
}

export default new WalletsDao();