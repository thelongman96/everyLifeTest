import { toast } from 'react-toastify';
import { useEventStore } from '../../../stores/event-store';
import { useModalStore } from '../../../stores/modal-store';

const useCalendarToolbar = () => {
  const { selectedEvent, showIds, setShowIds } = useEventStore(
    (state) => state,
  );
  const toggleModal = useModalStore((state) => state.toggleModal);
  const createEvent = async () => {
    toggleModal();
  };

  const editEvent = () => {
    if (selectedEvent) {
      toggleModal();
    } else {
      toast.error('Please select an event to edit');
    }
  };

  return {
    createEvent,
    editEvent,
    selectedEvent,
    showIds,
    setShowIds,
  };
};

export default useCalendarToolbar;
