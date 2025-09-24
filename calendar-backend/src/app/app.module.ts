import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarDomainModule } from '@fs-tech-test/calendar-domain';
import { AccessLoggerMiddleware } from '../middleware/access-logger.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    CalendarDomainModule.register(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  controllers: [CalendarController, AuthController],
  providers: [CalendarService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLoggerMiddleware).forRoutes('*');
  }
}
