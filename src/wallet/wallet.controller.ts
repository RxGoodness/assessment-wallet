import { Controller, Body, Post, UseGuards, Request, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { DebitWalletDto } from './dto/debit-wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallet')
export class WalletController {
	private readonly logger = new Logger(WalletController.name);
	constructor(private readonly walletService: WalletService) {}

	@UseGuards(JwtAuthGuard)
	@Post('credit')
	async credit(@Request() req: { user: { userId: number } }, @Body() dto: CreditWalletDto) {
		try {
			const result = await this.walletService.credit(req.user.userId, dto);
			return { success: true, data: result };
		} catch (error) {
			this.logger.error('Credit error', error.stack);
			throw new HttpException({ success: false, message: error.message }, error.status || HttpStatus.BAD_REQUEST);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('debit')
	async debit(@Request() req: { user: { userId: number } }, @Body() dto: DebitWalletDto) {
		try {
			const result = await this.walletService.debit(req.user.userId, dto);
			return { success: true, data: result };
		} catch (error) {
			this.logger.error('Debit error', error.stack);
			throw new HttpException({ success: false, message: error.message }, error.status || HttpStatus.BAD_REQUEST);
		}
	}
}
