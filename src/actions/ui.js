import { TYPES } from "../types/types";

export const openModal = () => ({
  type: TYPES.uiOpenModal,
});

export const closeModal = () => ({
  type: TYPES.uiCloseModal,
});

export const eventClearActiveEvent= () => {
  return {
    type: TYPES.eventClearActiveEvent,
  };
};

export const startLoading = () => ({
  type: TYPES.uiStartLoading,
});

export const finishLoading = () => ({
  type: TYPES.uiFinishLoading,
});
