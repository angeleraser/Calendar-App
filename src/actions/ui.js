import { TYPES } from "../types/types";

export const openModal = () => ({
  type: TYPES.uiOpenModal,
});
export const closeModal = () => ({
  type: TYPES.uiCloseModal,
});