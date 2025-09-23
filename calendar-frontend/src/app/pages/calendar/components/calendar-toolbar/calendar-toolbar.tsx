import useCalendarToolbar from '../../hooks/use-calendar-toolbar';
import { ToolbarStyle } from './styles/calendar-toolbar-style';

export const CalendarToolbar = () => {
  const { createEvent, editEvent, selectedEvent, showIds, setShowIds } =
    useCalendarToolbar();

  return (
    <div css={ToolbarStyle}>
      <button data-testid="add-event-btn" onClick={createEvent}>
        Add event
      </button>
      <button
        data-testid="edit-event-btn"
        onClick={editEvent}
        disabled={!selectedEvent}
      >
        Edit event
      </button>
      <label htmlFor="show-ids-checkbox">
        <input
          id="show-ids-checkbox"
          type="checkbox"
          defaultChecked={showIds}
          onClick={(e) => setShowIds({ showIds: e.currentTarget.checked })}
        ></input>
        Show ids
      </label>
    </div>
  );
};
