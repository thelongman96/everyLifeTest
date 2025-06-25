import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('date-range')
  async getEvents(@Query('start') start: string, @Query('end') end: string) {
    return this.calendarService.getEvents(start, end);
  }

  @Post('create-event')
  async createEvent(@Body() payload: EventPayload) {
    const id = await this.calendarService.addEvent(payload);
    return { message: 'Event created', id };
  }

  @Delete('delete-event/:id')
  async deleteEvent(@Param('id', new ParseIntPipe()) id: number) {
    await this.calendarService.deleteEvent(id);
    return { message: 'Event deleted', id };
  }
}
