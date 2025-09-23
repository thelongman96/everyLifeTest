import { render, screen } from '@testing-library/react';
import { CalendarToolbar } from './calendar-toolbar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import * as useCalendarToolbar from '../../hooks/use-calendar-toolbar';

const mockCreateEvent = jest.fn();
const mockEditEvent = jest.fn();
const mockSetShowIds = jest.fn();
const useCalendarToolbarValues = {
  createEvent: mockCreateEvent,
  editEvent: mockEditEvent,
  selectedEvent: null,
  showIds: false,
  setShowIds: mockSetShowIds,
};

const mockUseCalendarToolbar = useCalendarToolbar;
mockUseCalendarToolbar.default = () => useCalendarToolbarValues;

describe('CalendarToolbarComponent', () => {
  it('renders correctly', () => {
    const { container } = render(<CalendarToolbar />);

    expect(container).toMatchSnapshot();
  });

  describe('Add event button', () => {
    it('should ', async () => {
      render(<CalendarToolbar />);

      const btn = screen.getByTestId('add-event-btn');
      userEvent.click(btn);

      expect(mockCreateEvent).toHaveBeenCalled();
    });
  });

  describe('Edit event button', () => {
    it('should only be disabled if there is no selected event', async () => {
      render(<CalendarToolbar />);

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeDisabled();
    });

    it('should only be disabled if there is a selected event', async () => {
      const mockSelectedEvent = {
        id: 1,
        title: 'test',
        start: '',
        end: '',
      };
      const valsWithSelectedEvent = {
        ...useCalendarToolbarValues,
        selectedEvent: mockSelectedEvent,
      };

      mockUseCalendarToolbar.default = () => valsWithSelectedEvent;
      render(<CalendarToolbar />);

      const btn = screen.getByTestId('edit-event-btn');
      expect(btn).toBeEnabled();
    });
  });

  describe('Show ids checkbox', () => {
    it('should toggle ids being shown', () => {
      render(<CalendarToolbar />);

      const checkbox = screen.getByLabelText('Show ids');
      expect(checkbox).not.toBeChecked();

      // Check
      userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      expect(mockSetShowIds).toHaveBeenCalledWith({ showIds: true });

      // Uncheck
      userEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(mockSetShowIds).toHaveBeenCalledWith({ showIds: false });
    });
  });
});
