import Login from "../components/auth/Login";
import { useModalStore } from "../zustand/ModalStore";

export const openLogin = () => {
  const openModal = useModalStore.getState().openModal;
  openModal(<Login />);
};
