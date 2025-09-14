import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async register(data: AuthRegisterDto) {
        try {
            // Check if email already exists
            const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
            if (existingUser) {
                this.logger.warn(`Registration attempt with existing email: ${data.email}`);
                throw new HttpException('Email already exists', HttpStatus.CONFLICT);
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                },
            });
            // Create wallet for user
            await this.prisma.wallet.create({
                data: {
                    userId: user.id_pk,
                    balance: 0,
                    currency: 'NGN',
                },
            });
            return { id: user.id_pk, email: user.email, name: user.name };
        } catch (error) {
            this.logger.error('Register error', error.stack);
            if (error instanceof HttpException) throw error;
            throw new HttpException(error.message || 'Registration failed', HttpStatus.BAD_REQUEST);
        }
    }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) return null;
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return null;
            return user;
        } catch (error) {
            this.logger.error('ValidateUser error', error.stack);
            throw error;
        }
    }

    async login(data: AuthLoginDto) {
        try {
            const user = await this.validateUser(data.email, data.password);
            if (!user) return null;
            const payload = { email: user.email, sub: user.id_pk };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            this.logger.error('Login error', error.stack);
            throw error;
        }
    }
}
