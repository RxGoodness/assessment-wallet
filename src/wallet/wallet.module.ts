import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
   imports: [PrismaModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
