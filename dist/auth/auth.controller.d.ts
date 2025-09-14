import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(data: AuthRegisterDto): Promise<{
        success: boolean;
        data: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    login(data: AuthLoginDto): Promise<{
        success: boolean;
        data: {
            access_token: string;
        };
    }>;
}
