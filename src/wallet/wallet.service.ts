import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { DebitWalletDto } from './dto/debit-wallet.dto';

@Injectable()
export class WalletService {
    private readonly logger = new Logger(WalletService.name);

    constructor(private readonly prisma: PrismaService) {}

    async credit(userId: number, dto: CreditWalletDto) {
        try {
            return await this.prisma.$transaction(async (tx: PrismaClient) => {
                const wallet = await tx.wallet.findFirst({ where: { userId } });
                if (!wallet) throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
                const newBalance = wallet.balance.add(dto.amount);
                const updated = await tx.wallet.update({
                    where: { id_pk: wallet.id_pk },
                    data: { balance: newBalance },
                });
                return updated;
            });
        } catch (error) {
            this.logger.error('Credit error', error.stack);
            if (error instanceof HttpException) throw error;
            throw new HttpException(error.message || 'Credit failed', HttpStatus.BAD_REQUEST);
        }
    }

    async debit(userId: number, dto: DebitWalletDto) {
        try {
            return await this.prisma.$transaction(async (tx: PrismaClient) => {
                const wallet = await tx.wallet.findFirst({ where: { userId } });
                if (!wallet) throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
                if (wallet.balance.lessThan(dto.amount)) throw new HttpException('Insufficient balance', HttpStatus.CONFLICT);
                const newBalance = wallet.balance.sub(dto.amount);
                const updated = await tx.wallet.update({
                    where: { id_pk: wallet.id_pk },
                    data: { balance: newBalance },
                });
                return updated;
            });
        } catch (error) {
            this.logger.error('Debit error', error.stack);
            if (error instanceof HttpException) throw error;
            throw new HttpException(error.message || 'Debit failed', HttpStatus.BAD_REQUEST);
        }
    }
}
