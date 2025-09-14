import { WalletService } from './wallet.service';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { DebitWalletDto } from './dto/debit-wallet.dto';
export declare class WalletController {
    private readonly walletService;
    private readonly logger;
    constructor(walletService: WalletService);
    credit(req: {
        user: {
            userId: number;
        };
    }, dto: CreditWalletDto): Promise<{
        success: boolean;
        data: {
            id_pk: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: number;
        };
    }>;
    debit(req: {
        user: {
            userId: number;
        };
    }, dto: DebitWalletDto): Promise<{
        success: boolean;
        data: {
            id_pk: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            balance: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            userId: number;
        };
    }>;
}
