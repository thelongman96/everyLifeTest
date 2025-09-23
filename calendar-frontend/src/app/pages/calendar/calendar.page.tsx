import { CalendarView } from './components/calendar-view/calendar-view';
import { CalendarToolbar } from './components/calendar-toolbar/calendar-toolbar';
import { useCalendar } from './hooks/use-calendar';
import Modal from './components/modal/event-modal';
import EventForm from './components/event-form/event-form';

export const CalendarPage = () => {
  const {
    handleSaveClick,
    handleInputChange,
    formData,
    errors,
    events,
    onNavigate,
    updateEvent,
    isLoading,
    disabled,
    isEditing,
  } = useCalendar();

  return (
    <div>
      <CalendarToolbar />
      <CalendarView
        onNavigate={onNavigate}
        events={events}
        updateEvent={updateEvent}
      />
      <Modal
        handleSave={handleSaveClick}
        loading={isLoading}
        disabled={disabled}
      >
        <EventForm
          handleInputChange={handleInputChange}
          formData={formData}
          errors={errors}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
};
