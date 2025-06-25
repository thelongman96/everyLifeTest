import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { CalendarDomainModule } from '@fs-tech-test/calendar-domain';
import { AccessLoggerMiddleware } from '../middleware/access-logger.middleware';

@Module({
  imports: [CalendarDomainModule.register()],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLoggerMiddleware).forRoutes('*');
  }
}
