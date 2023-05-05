import { create } from "zustand";

interface VerificationModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useVerificationModal = create<VerificationModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useVerificationModal;
