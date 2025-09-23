import { useMemo } from 'react';
import { EltEvent } from '../../../common/types';
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';
import { useEventStore } from '../../../stores/event-store';

const getCustomCalendarEventComponent =
  ({ showIds }: { showIds: boolean }) =>
  ({ event }: { event: EltEvent }) => {
    return (
      <span className="eventComponent">
        <strong>{event.title}</strong>
        {showIds && <div>id: {event.id}</div>}
      </span>
    );
  };

const useCalendarView = (updateEvent: (event: EltEvent) => void) => {
  const { selectedEvent, storeSelectedEvent, showIds } = useEventStore();
  const components = useMemo(
    () => ({ event: getCustomCalendarEventComponent({ showIds }) }),
    [showIds],
  );

  // Use the correct type for the event drop argument
  const onEventDrop = (e: EventInteractionArgs<EltEvent>) => {
    const {
      start,
      end,
      event: { id, title },
    } = e;
    updateEvent({ id, start, end, title });
  };

  const onEventResize = (e: EventInteractionArgs<EltEvent>) => {
    const {
      start,
      end,
      event: { id, title },
    } = e;
    updateEvent({ id, start, end, title });
  };

  const setSelectedEvent = (event: EltEvent | null) => {
    storeSelectedEvent({ selectedEvent: event });
  };

  return {
    components,
    onEventDrop,
    onEventResize,
    selectedEvent,
    setSelectedEvent,
  };
};

export default useCalendarView;
