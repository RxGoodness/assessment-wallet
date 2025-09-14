import { PrismaService } from '../prisma/prisma.service';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { DebitWalletDto } from './dto/debit-wallet.dto';
export declare class WalletService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    credit(userId: number, dto: CreditWalletDto): Promise<{
        id_pk: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: number;
    }>;
    debit(userId: number, dto: DebitWalletDto): Promise<{
        id_pk: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        balance: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        userId: number;
    }>;
}
