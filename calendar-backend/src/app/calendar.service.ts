import { BadRequestException, Injectable } from '@nestjs/common';
import { CalendarEventRepository } from '@fs-tech-test/calendar-domain';

@Injectable()
export class CalendarService {
  constructor(
    private readonly calendarEventRepository: CalendarEventRepository,
  ) {}

  async getEvents(start: string, end: string) {
    if (!start || !end) throw new BadRequestException('No start/end specified');

    return this.calendarEventRepository.findForRange(
      new Date(start),
      new Date(end),
    );
  }

  async addEvent(payload: EventPayload) {
    if (!payload.name) throw new BadRequestException('No title specified');
    if (!payload.start)
      throw new BadRequestException('No start date specified');
    if (!payload.end) throw new BadRequestException('No end date specified');
    const newEntity = await this.calendarEventRepository.createNewEvent(
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return newEntity.id;
  }

  async updateEvent(id: number, payload: EventPayload) {
    if (!id) throw new BadRequestException('No id specified');
    if (!payload.name) throw new BadRequestException('No title specified');
    if (!payload.start)
      throw new BadRequestException('No start date specified');
    if (!payload.end) throw new BadRequestException('No end date specified');

    const entity = await this.calendarEventRepository.updateEvent(
      id,
      payload.name,
      new Date(payload.start),
      new Date(payload.end),
    );

    return entity;
  }

  async deleteEvent(id: number) {
    await this.calendarEventRepository.deleteById(id);
  }
}
