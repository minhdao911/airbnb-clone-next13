import { create } from "zustand";

type AuthModalType = "register" | "login";

interface AuthModalStore {
  isOpen: boolean;
  type: AuthModalType;
  onOpen: (type: AuthModalType) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  type: "login",
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
