import { Controller, Body, Post, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() data: AuthRegisterDto) {
		try {
			const result = await this.authService.register(data);
			return { success: true, data: result };
		} catch (error) {
			this.logger.error('Register error', error.stack);
			throw new HttpException({ success: false, message: error.message }, error.status || HttpStatus.BAD_REQUEST);
		}
	}

	@Post('login')
	async login(@Body() data: AuthLoginDto) {
		try {
			const result = await this.authService.login(data);
			if (!result) {
				throw new HttpException({ success: false, message: 'Invalid credentials' }, HttpStatus.UNAUTHORIZED);
			}
			return { success: true, data: result };
		} catch (error) {
			this.logger.error('Login error', error.stack);
			throw new HttpException({ success: false, message: error.message }, error.status || HttpStatus.BAD_REQUEST);
		}
	}
}
