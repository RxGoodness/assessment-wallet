import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { WalletController } from './wallet/wallet.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { WalletService } from './wallet/wallet.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
