import { render, screen, within } from '@testing-library/react';
import { CalendarView } from './calendar-view';
import { View } from 'react-big-calendar';
import { EltEvent } from '../../../../common/types';
import '@testing-library/jest-dom';
import * as useCalendarView from '../../hooks/use-calendar-view';

let showIds = false;
const getCustomCalendarEventComponentMock =
  () =>
  ({ event }: { event: EltEvent }) => {
    return (
      <span className="eventComponent">
        <strong>{event.title}</strong>
        {showIds ? <div>id: {event.id}</div> : ''}
      </span>
    );
  };

const componentsMock = { event: getCustomCalendarEventComponentMock() };
const mockOnEventDrop = jest.fn();
const mockOnEventResize = jest.fn();
const mockSetSelectedEvent = jest.fn();
const mockSelectedEvent = {
  id: 100,
  title: 'Mock event',
  start: new Date('2024-10-11T12:15:00Z'),
  end: new Date('2024-10-11T12:45:00Z'),
};
const useCalendarViewValues = {
  components: componentsMock,
  onEventDrop: mockOnEventDrop,
  onEventResize: mockOnEventResize,
  selectedEvent: null,
  setSelectedEvent: mockSetSelectedEvent,
};

const mockUseCalendarView = useCalendarView;
mockUseCalendarView.default = () => useCalendarViewValues;

describe('CalendarView', () => {
  let onNavigate: (date: Date, view: View) => void;
  const mockUpdateEvent = jest.fn();

  beforeEach(() => {
    onNavigate = jest.fn();
    jest.useFakeTimers().setSystemTime(new Date('2024-10-11T10:30:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render an empty calendar', () => {
    const { container } = render(
      <CalendarView
        onNavigate={onNavigate}
        events={[]}
        updateEvent={mockUpdateEvent}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render a calendar with an event', () => {
    const { container } = render(
      <CalendarView
        onNavigate={onNavigate}
        events={[mockSelectedEvent]}
        updateEvent={mockUpdateEvent}
      />,
    );

    expect(container).toMatchSnapshot();

    const eventLabel = screen.getByText('Mock event');
    const event = eventLabel.closest('.rbc-event') as HTMLElement;
    const eventTime = event?.querySelector('.rbc-event-label');

    expect(eventTime).toHaveTextContent('12:15 - 12:45');
    expect(within(event).queryByText('id: 100')).not.toBeInTheDocument();
  });

  it('should show event ids if flag is set', () => {
    showIds = true;
    render(
      <CalendarView
        onNavigate={onNavigate}
        events={[mockSelectedEvent]}
        updateEvent={mockUpdateEvent}
      />,
    );

    const eventLabel = screen.getByText('Mock event');
    const event = eventLabel.closest('.rbc-event') as HTMLElement;

    expect(within(event).queryByText('id: 100')).toBeInTheDocument();
  });
});
