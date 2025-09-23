import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModalStoreState {
  isOpen: boolean;
  toggleModal: () => void;
  hasHydrated: boolean;
  setHasHydratedTrue: () => void;
}

export const useModalStore = create<
  ModalStoreState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      isOpen: false,
      toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
      hasHydrated: false,
      setHasHydratedTrue: () => {
        set({ hasHydrated: true });
      },
    }),
    {
      name: 'modal-storage',
      onRehydrateStorage: (state) => {
        return () => {
          state.setHasHydratedTrue();
        };
      },
    },
  ),
);
