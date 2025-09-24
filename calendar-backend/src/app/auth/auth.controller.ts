import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerPayload: RegisterPayload) {
    return this.authService.register(registerPayload);
  }

	@Post('login')
  async login(@Body() loginPayload: AuthPayload) {
    return this.authService.login(loginPayload);
  }

	@Get('fetchAll')
  async fetchAll() {
    return this.authService.fetchAll();
  }
}
