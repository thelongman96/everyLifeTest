import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { useCalendar } from './hooks/use-calendar';

export const CalendarPage = () => {
  const {
    events,
    addEvent,
    onNavigate,
    showIds,
    setShowIds,
    selectedEvent,
    setSelectedEvent,
  } = useCalendar();

  return (
    <div>
      <CalendarToolbar
        addEvent={addEvent}
        showIds={showIds}
        setShowIds={setShowIds}
        selectedEvent={selectedEvent}
      />
      <CalendarView
        onNavigate={onNavigate}
        events={events}
        showIds={showIds}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </div>
  );
};
