import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

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

  @UseGuards(AuthGuard)
	@Get('fetchAll')
  async fetchAll() {
    return this.authService.fetchAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.fetchProfile(req.user.userId);
  }
}
