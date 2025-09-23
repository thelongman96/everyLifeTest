import React from 'react';
import { renderHook } from '@testing-library/react';
import useCalendarToolbar from '../use-calendar-toolbar';
import { toast } from 'react-toastify';
import { EltEvent } from '../../../../common/types';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockSetShowIds = jest.fn();
let mockSelectedEvent: null | EltEvent = null;

jest.mock('../../../../stores/event-store.ts', () => ({
  useEventStore: (passedFunction: any) => {
    const data = {
      selectedEvent: mockSelectedEvent,
      showIds: false,
      setShowIds: mockSetShowIds,
    };

    return passedFunction(data);
  },
}));

const mockToggleModal = jest.fn();

jest.mock('../../../../stores/modal-store.ts', () => ({
  useModalStore: (passedFunction: any) => {
    const data = {
      toggleModal: mockToggleModal,
    };

    return passedFunction(data);
  },
}));

describe('useCalendarToolbar', () => {
  it('createEvent calls toggleModal', async () => {
    const { result } = renderHook(() => useCalendarToolbar());

    const { createEvent } = result.current;

    await renderHook(async () => {
      createEvent();
    });

    expect(mockToggleModal).toHaveBeenCalled();
  });

  it('EditEvent calls toast when selectedEvent is empty', async () => {
    const { result } = renderHook(() => useCalendarToolbar());

    const { editEvent } = result.current;

    await renderHook(async () => {
      editEvent();
    });

    expect(mockSelectedEvent).toEqual(null);
    expect(toast.error).toHaveBeenCalled();
  });

  it('EditEvent calls toggleModal when selectedEvent is populated', async () => {
    mockSelectedEvent = {
      id: 1,
      title: '',
      end: '',
      start: '',
    };
    const { result } = renderHook(() => useCalendarToolbar());

    const { editEvent } = result.current;

    await renderHook(async () => {
      editEvent();
    });

    expect(mockSelectedEvent.id).toEqual(1);
    expect(mockToggleModal).toHaveBeenCalled();
  });
});
