import { useEventStore } from '../../../stores/event-store';
import { useModalStore } from '../../../stores/modal-store';

const useModal = () => {
  const { isOpen, toggleModal } = useModalStore((state) => state);
  const storeSelectedEvent = useEventStore((state) => state.storeSelectedEvent);

  const closeModal = () => {
    storeSelectedEvent({ selectedEvent: null });
    toggleModal();
  };

  return {
    isOpen,
    closeModal,
  };
};

export default useModal;
