import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@fs-tech-test/calendar-domain';

@Injectable()
export class AuthService {

	constructor(
		private readonly userRepository: UserRepository,
		private jwtService: JwtService
	) {}

  async register(registerPayload: RegisterPayload) {
    if (!registerPayload.email)
      throw new BadRequestException('Please enter a valid email');
    if (!registerPayload.password)
      throw new BadRequestException('Please enter a valid password');
    if (!registerPayload.firstName)
      throw new BadRequestException('Please enter your first name');
    if (!registerPayload.lastName)
      throw new BadRequestException('Please enter your last name');

		const hashPass = await bcrypt.hash(registerPayload.password, 10);

		return this.userRepository.registerUser(
			registerPayload.email,
			hashPass,
			registerPayload.firstName,
			registerPayload.lastName,
		);
  }

	async login(loginPayload: AuthPayload) {
    if (!loginPayload.email)
      throw new BadRequestException('Please enter a valid email');
    if (!loginPayload.password)
      throw new BadRequestException('Please enter a valid password');

		const user = await this.userRepository.findUser(loginPayload.email);
    const isMatch = await bcrypt.compare(loginPayload.password, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
			access_token: await this.jwtService.signAsync(payload),
    };
  }

	async fetchAll() {
		return this.userRepository.getAllUsers();
	}
}
