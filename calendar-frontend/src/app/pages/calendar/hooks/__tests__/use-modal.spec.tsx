import { renderHook } from '@testing-library/react';
import useModal from '../use-modal';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockStoreSelectedEvent = jest.fn();

jest.mock('../../../../stores/event-store.ts', () => ({
  useEventStore: (passedFunction: any) => {
    const data = {
      storeSelectedEvent: mockStoreSelectedEvent,
    };

    return passedFunction(data);
  },
}));

const mockToggleModal = jest.fn();

jest.mock('../../../../stores/modal-store.ts', () => ({
  useModalStore: (passedFunction: any) => {
    const data = {
      toggleModal: mockToggleModal,
      isOpen: false,
    };

    return passedFunction(data);
  },
}));

describe('useModal', () => {
  it('closeModal calls toggleModal', async () => {
    const { result } = renderHook(() => useModal());

    const { closeModal } = result.current;

    await renderHook(async () => {
      closeModal();
    });

    expect(mockStoreSelectedEvent).toHaveBeenCalled();
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
