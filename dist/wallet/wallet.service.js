"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var WalletService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = WalletService_1 = class WalletService {
    prisma;
    logger = new common_1.Logger(WalletService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async credit(userId, dto) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const wallet = await tx.wallet.findFirst({ where: { userId } });
                if (!wallet)
                    throw new common_1.HttpException('Wallet not found', common_1.HttpStatus.NOT_FOUND);
                const newBalance = wallet.balance.add(dto.amount);
                const updated = await tx.wallet.update({
                    where: { id_pk: wallet.id_pk },
                    data: { balance: newBalance },
                });
                return updated;
            });
        }
        catch (error) {
            this.logger.error('Credit error', error.stack);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message || 'Credit failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async debit(userId, dto) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const wallet = await tx.wallet.findFirst({ where: { userId } });
                if (!wallet)
                    throw new common_1.HttpException('Wallet not found', common_1.HttpStatus.NOT_FOUND);
                if (wallet.balance.lessThan(dto.amount))
                    throw new common_1.HttpException('Insufficient balance', common_1.HttpStatus.CONFLICT);
                const newBalance = wallet.balance.sub(dto.amount);
                const updated = await tx.wallet.update({
                    where: { id_pk: wallet.id_pk },
                    data: { balance: newBalance },
                });
                return updated;
            });
        }
        catch (error) {
            this.logger.error('Debit error', error.stack);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message || 'Debit failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = WalletService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map