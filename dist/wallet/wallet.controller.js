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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var WalletController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const credit_wallet_dto_1 = require("./dto/credit-wallet.dto");
const debit_wallet_dto_1 = require("./dto/debit-wallet.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let WalletController = WalletController_1 = class WalletController {
    walletService;
    logger = new common_1.Logger(WalletController_1.name);
    constructor(walletService) {
        this.walletService = walletService;
    }
    async credit(req, dto) {
        try {
            const result = await this.walletService.credit(req.user.userId, dto);
            return { success: true, data: result };
        }
        catch (error) {
            this.logger.error('Credit error', error.stack);
            throw new common_1.HttpException({ success: false, message: error.message }, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async debit(req, dto) {
        try {
            const result = await this.walletService.debit(req.user.userId, dto);
            return { success: true, data: result };
        }
        catch (error) {
            this.logger.error('Debit error', error.stack);
            throw new common_1.HttpException({ success: false, message: error.message }, error.status || common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('credit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, credit_wallet_dto_1.CreditWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "credit", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('debit'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, debit_wallet_dto_1.DebitWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "debit", null);
exports.WalletController = WalletController = WalletController_1 = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map