import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    private readonly logger;
    constructor(jwtService: JwtService, prisma: PrismaService);
    register(data: AuthRegisterDto): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        id_pk: number;
        uuid: string;
        email: string;
        password: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    login(data: AuthLoginDto): Promise<{
        access_token: string;
    } | null>;
}
