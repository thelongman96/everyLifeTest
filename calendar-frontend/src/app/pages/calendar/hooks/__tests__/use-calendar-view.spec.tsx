import React from 'react';
import { renderHook } from '@testing-library/react';
import useCalendarView from '../use-calendar-view';
import { EltEvent } from '../../../../common/types';

const mockUpdateEvent = jest.fn();

const mockEventUpdate = {
  event: {
    id: 1,
    title: 'Test Event',
  },
  start: new Date(),
  end: new Date(),
};

const mockEvent = {
  id: 1,
  title: 'Test Event',
  start: new Date(),
  end: new Date(),
};

const mockStoreSelectedEvent = jest.fn();
const mockSelectedEvent: null | EltEvent = mockEvent;

jest.mock('../../../../stores/event-store.ts', () => ({
  useEventStore: (passedFunction: any) => {
    const data = {
      selectedEvent: mockSelectedEvent,
      storeSelectedEvent: mockStoreSelectedEvent,
      showIds: true,
    };

    return passedFunction(data);
  },
}));

describe('useCalendarView', () => {
  it('onEventDrop calls updateEvent', async () => {
    const { result } = renderHook(() => useCalendarView(mockUpdateEvent));

    const { onEventDrop } = result.current;

    await renderHook(async () => {
      onEventDrop(mockEventUpdate);
    });

    expect(mockUpdateEvent).toHaveBeenCalled();
  });

  it('onEventResize calls updateEvent', async () => {
    const { result } = renderHook(() => useCalendarView(mockUpdateEvent));

    const { onEventResize } = result.current;

    await renderHook(async () => {
      onEventResize(mockEventUpdate);
    });

    expect(mockUpdateEvent).toHaveBeenCalled();
  });

  it('setSelectedEvent calls store selectedEvent', async () => {
    const { result } = renderHook(() => useCalendarView(mockUpdateEvent));

    const { setSelectedEvent } = result.current;

    await renderHook(async () => {
      setSelectedEvent(mockEvent);
    });

    expect(mockStoreSelectedEvent).toHaveBeenCalled();
  });
});
