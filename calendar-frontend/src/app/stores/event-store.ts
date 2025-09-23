import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EltEvent } from '../common/types';

interface EventStoreState {
  selectedEvent: EltEvent | null;
  storeSelectedEvent: ({
    selectedEvent,
  }: {
    selectedEvent: EltEvent | null;
  }) => void;
  showIds: boolean;
  setShowIds: ({ showIds }: { showIds: boolean }) => void;
  hasHydrated: boolean;
  setHasHydratedTrue: () => void;
}

export const useEventStore = create<
  EventStoreState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      selectedEvent: null,
      storeSelectedEvent: ({
        selectedEvent,
      }: {
        selectedEvent: EltEvent | null;
      }) => {
        set({ selectedEvent });
      },
      showIds: false,
      setShowIds: ({ showIds }: { showIds: boolean }) => {
        set({ showIds });
      },
      hasHydrated: false,
      setHasHydratedTrue: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: 'event-storage',
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydratedTrue();
        };
      },
    },
  ),
);
