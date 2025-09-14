"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
let AuthService = AuthService_1 = class AuthService {
    jwtService;
    prisma;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async register(data) {
        try {
            const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
            if (existingUser) {
                this.logger.warn(`Registration attempt with existing email: ${data.email}`);
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.CONFLICT);
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                },
            });
            await this.prisma.wallet.create({
                data: {
                    userId: user.id_pk,
                    balance: 0,
                    currency: 'NGN',
                },
            });
            return { id: user.id_pk, email: user.email, name: user.name };
        }
        catch (error) {
            this.logger.error('Register error', error.stack);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message || 'Registration failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user)
                return null;
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid)
                return null;
            return user;
        }
        catch (error) {
            this.logger.error('ValidateUser error', error.stack);
            throw error;
        }
    }
    async login(data) {
        try {
            const user = await this.validateUser(data.email, data.password);
            if (!user)
                return null;
            const payload = { email: user.email, sub: user.id_pk };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            this.logger.error('Login error', error.stack);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map