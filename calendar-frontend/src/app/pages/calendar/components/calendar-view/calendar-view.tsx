import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import './styles/calendar.scss';
import { EltEvent } from '../../../../common/types';
import { CalendarFormats } from './formats';
import useCalendarView from '../../hooks/use-calendar-view';

moment.locale('en-gb');
moment.updateLocale('en-gb', {
  week: {
    // Set the first day of week to Monday
    dow: 1,
  },
});
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<EltEvent>(Calendar);

interface ICalendarViewProps {
  onNavigate: (date: Date, view: View) => void;
  events: EltEvent[];
  selectedEvent?: EltEvent;
  updateEvent: (event: EltEvent) => Promise<void>;
}

export const CalendarView = ({
  onNavigate,
  events,
  updateEvent,
}: ICalendarViewProps) => {
  const {
    components,
    onEventDrop,
    onEventResize,
    selectedEvent,
    setSelectedEvent,
  } = useCalendarView(updateEvent);

  return (
    <DnDCalendar
      components={components}
      defaultDate={moment().toDate()}
      events={events}
      onNavigate={onNavigate}
      defaultView={'week'}
      onSelectEvent={setSelectedEvent}
      localizer={localizer}
      formats={CalendarFormats}
      onEventDrop={onEventDrop}
      onEventResize={onEventResize}
      resizable
      style={{ height: '80vh' }}
      popup={true}
      dayLayoutAlgorithm={'no-overlap'}
      selectable
      selected={selectedEvent}
      onSelectSlot={() => setSelectedEvent(null)}
    />
  );
};
